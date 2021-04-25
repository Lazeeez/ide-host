import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { RadioGroup } from '@headlessui/react';
import classNames from 'classnames';
import { XIcon } from '@heroicons/react/outline';
import { EDITOR_MODES, LANGUAGES, useSettings } from './SettingsContext';

export interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal = ({
  isOpen,
  onClose,
}: SettingsDialogProps): JSX.Element => {
  const { settings, setSettings } = useSettings();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={isOpen}
        onClose={() => onClose()}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="p-4 sm:px-6 border-b border-gray-200">
                <Dialog.Title
                  as="h3"
                  className="text-lg leading-6 font-medium text-gray-900"
                >
                  Settings
                </Dialog.Title>
              </div>

              <div className="p-4 sm:p-6 sm:pt-4 space-y-6">
                <div>
                  <RadioGroup
                    value={settings.editorMode}
                    onChange={mode => setSettings({ editorMode: mode })}
                  >
                    <RadioGroup.Label className="font-medium text-gray-800 mb-4">
                      Editor Mode
                    </RadioGroup.Label>
                    <div className="bg-white rounded-md space-x-4">
                      {EDITOR_MODES.map(setting => (
                        <RadioGroup.Option
                          key={setting}
                          value={setting}
                          className="relative inline-flex items-center cursor-pointer focus:outline-none"
                        >
                          {({ active, checked }) => (
                            <>
                              <span
                                className={classNames(
                                  checked
                                    ? 'bg-indigo-600 border-transparent'
                                    : 'bg-white border-gray-300',
                                  active
                                    ? 'ring-2 ring-offset-2 ring-indigo-500'
                                    : '',
                                  'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center'
                                )}
                                aria-hidden="true"
                              >
                                <span className="rounded-full bg-white w-1.5 h-1.5" />
                              </span>
                              <div className="ml-2 flex flex-col">
                                <RadioGroup.Label
                                  as="span"
                                  className={classNames(
                                    checked ? 'text-gray-800' : 'text-gray-600',
                                    'block text-sm font-medium'
                                  )}
                                >
                                  {setting}
                                </RadioGroup.Label>
                              </div>
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {LANGUAGES.map(({ label, value }) => (
                  <div key={value}>
                    <label
                      htmlFor={`compiler_options_${value}`}
                      className="block font-medium text-gray-700"
                    >
                      {label} Compiler Options
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name={`compiler_options_${value}`}
                        id={`compiler_options_${value}`}
                        className="mt-0 block w-full px-0 pt-0 pb-1 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black font-mono"
                        value={settings.compilerOptions[value]}
                        placeholder="None"
                        onChange={e =>
                          setSettings({
                            compilerOptions: {
                              ...settings.compilerOptions,
                              [value]: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                ))}

                <div>
                  <button
                    type="button"
                    className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => onClose()}
                  >
                    Done
                  </button>
                </div>
              </div>
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => onClose()}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};