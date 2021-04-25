import Editor, { EditorProps } from '@monaco-editor/react';
import { useState, useEffect } from 'react';
import Firepad from '../scripts/firepad';
import type firebaseType from 'firebase';
import { EditorWithVim } from './EditorWithVim';

export interface FirepadEditorProps extends EditorProps {
  firebaseRef: firebaseType.database.Reference | undefined;
  useEditorWithVim?: boolean;
}

const FirepadEditor = ({
  onMount,
  defaultValue,
  firebaseRef,
  useEditorWithVim = false,
  ...props
}: FirepadEditorProps): JSX.Element => {
  const [
    editor,
    setEditor,
  ] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (!firebaseRef || !editor) return;

    // we reset the value here since firepad initialization can't have any text in it
    // firepad will fetch the text from firebase and update monaco
    editor.setValue('');
    const firepad = Firepad.fromMonaco(firebaseRef, editor);

    if (defaultValue) {
      firepad.on('ready', function () {
        if (editor.getValue().length === 0) {
          editor.setValue(defaultValue);
        }
      });
    }

    return () => firepad.dispose();
    // defaultValue shouldn't change without the other values changing (and if it does, it's probably a bug)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseRef, editor]);

  const EditorComponent = useEditorWithVim ? EditorWithVim : Editor;

  return (
    <div className="tw-forms-disable tw-forms-disable-all-descendants h-full">
      <EditorComponent
        {...props}
        onMount={(e, m) => {
          setEditor(e);
          if (onMount) onMount(e, m);
        }}
      />
    </div>
  );
};

export default FirepadEditor;