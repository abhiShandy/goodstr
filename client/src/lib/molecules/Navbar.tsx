import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  GlobeAltIcon,
  KeyIcon,
  WalletIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { FaGithub } from "react-icons/fa";
import { BiBitcoin } from "react-icons/bi";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type NavbarProps = {
  currentPage?: "discover" | "sell";
};

export const Navbar = ({ currentPage }: NavbarProps) => {
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center font-bold text-lg font-mono">
                  <a href="/"><svg title="GoodStr" alt="GoodStr" width="120" height="41" viewBox="0 0 239 82" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="239" height="82" fill="white"/><path d="M94.1618 45.4654C94.1618 48.415 92.3722 50.1952 89.4641 50.1952C86.0054 50.1952 84.2158 47.8565 84.2158 43.3361V38.4667C84.2158 33.9463 85.9882 31.6076 89.4125 31.6076C92.1313 31.6076 94.0241 33.5275 94.1618 36.4421H98.3604C98.24 31.084 94.8673 27.8028 89.4986 27.8028C83.4931 27.8028 80 31.7123 80 38.4667V43.3361C80 50.0905 83.4931 54 89.4986 54C94.7985 54 98.3776 50.6665 98.3776 45.6225V40.3516H89.1028V43.6154H94.1618V45.4654Z" fill="black"/>
<path d="M110.836 53.8778C116.033 53.8778 119.319 50.5966 119.319 45.3956V42.4809C119.319 37.2799 116.033 33.9987 110.836 33.9987C105.639 33.9987 102.353 37.2799 102.353 42.4809V45.3956C102.353 50.5966 105.639 53.8778 110.836 53.8778ZM110.836 37.3672C113.624 37.3672 115.361 39.4092 115.361 42.7078V45.1687C115.361 48.4674 113.624 50.5094 110.836 50.5094C108.048 50.5094 106.31 48.4674 106.31 45.1687V42.7078C106.31 39.4092 108.048 37.3672 110.836 37.3672Z" fill="black"/>
<path d="M132.621 53.8778C137.817 53.8778 141.104 50.5966 141.104 45.3956V42.4809C141.104 37.2799 137.817 33.9987 132.621 33.9987C127.424 33.9987 124.137 37.2799 124.137 42.4809V45.3956C124.137 50.5966 127.424 53.8778 132.621 53.8778ZM132.621 37.3672C135.408 37.3672 137.146 39.4092 137.146 42.7078V45.1687C137.146 48.4674 135.408 50.5094 132.621 50.5094C129.833 50.5094 128.095 48.4674 128.095 45.1687V42.7078C128.095 39.4092 129.833 37.3672 132.621 37.3672Z" fill="black"/>
<path d="M152.667 53.7906C155.403 53.7906 157.313 52.5863 158.105 50.3523H158.449V53.4939H162.51V27H158.38V37.5068H158.036C157.331 35.2902 155.386 34.0511 152.667 34.0511C148.348 34.0511 145.664 37.1403 145.664 42.2191V45.6225C145.664 50.7188 148.348 53.7906 152.667 53.7906ZM154.113 50.2476C151.411 50.2476 149.742 48.3801 149.742 45.3782V42.3937C149.742 39.3917 151.411 37.5068 154.113 37.5068C156.797 37.5068 158.466 39.3743 158.466 42.3937V45.3782C158.466 48.3801 156.797 50.2476 154.113 50.2476Z" fill="black"/><path d="M167.225 46.5824C167.431 51.19 170.89 54 176.328 54C181.886 54 185.327 51.0504 185.327 46.2683C185.327 42.446 183.262 40.2818 178.461 39.1474L176.07 38.5714C173.162 37.8908 171.957 36.7912 171.957 34.8539C171.957 32.6723 173.626 31.3633 176.379 31.3633C178.995 31.3633 180.698 32.7246 180.922 35.0284H184.88C184.725 30.6652 181.335 27.8028 176.345 27.8028C171.131 27.8028 167.793 30.7001 167.793 35.2204C167.793 38.9205 169.961 41.2418 174.504 42.3413L176.896 42.9173C179.959 43.6503 181.197 44.7324 181.197 46.6348C181.197 48.956 179.322 50.4396 176.397 50.4396C173.368 50.4396 171.441 49.0084 171.2 46.5824H167.225Z" fill="black"/>
<path d="M194.344 29.042V34.5048H189.388V37.786H194.344V47.5947C194.344 51.8358 196.392 53.5462 201.347 53.5462C201.915 53.5462 205.082 53.4939 205.391 53.4415V50.1952C205.064 50.2301 202.346 50.2476 201.657 50.2476C199.524 50.2476 198.336 49.3051 198.336 47.6122V37.786H205.546V34.5048H198.267V29.042H194.344Z" fill="black"/>
<path d="M219.243 44.9767C219.243 40.5611 221.532 38.1526 225.885 38.1526C226.918 38.1526 228.157 38.362 229 38.6936V34.278C228.346 34.0162 227.365 33.8765 226.298 33.8765C222.719 33.8765 220.62 35.5869 219.846 39.2696H219.261V34.3827H211.362V37.4195H215.389V50.457H211.724V53.4939H224.853V50.457H219.243V44.9767Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 16H59V21.5538H22.6V45.7426L37.0667 61.1177L53.4 45.7426V33.5871H44.0667V28.0333H59V48.0316L37.0667 69L17 48.0316V16Z" fill="url(#paint0_linear_112_3406)"/>
<path d="M38.9091 26V38.6H48L37.0909 56V43.4H28L38.9091 26Z" fill="url(#paint1_linear_112_3406)"/><defs><linearGradient id="paint0_linear_112_3406" x1="38.9333" y1="11.3718" x2="38.9333" y2="72.7025" gradientUnits="userSpaceOnUse">
<stop stop-color="#663399"/><stop offset="1" stop-color="#FF00FF"/></linearGradient><linearGradient id="paint1_linear_112_3406" x1="38" y1="26" x2="38" y2="56" gradientUnits="userSpaceOnUse">
<stop stop-color="#FF9500"/><stop offset="1" stop-color="#FFFF00"/></linearGradient></defs></svg>
</a>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {/* Current: "border-gray-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  <a
                    href="/discover"
                    className={
                      "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium text-gray-900" +
                      (currentPage === "discover"
                        ? " border-gray-500"
                        : " border-transparent hover:border-gray-300 hover:text-gray-700")
                    }
                  >
                    <GlobeAltIcon className="h-5 w-5 mr-2" />
                    Discover
                  </a>

                  <a
                    href="/sell"
                    className={
                      "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium text-gray-900" +
                      (currentPage === "sell"
                        ? " border-gray-500"
                        : " border-transparent hover:border-gray-300 hover:text-gray-700")
                    }
                  >
                    <BiBitcoin className="w-5 h-5 mr-2" />
                    Sell
                  </a>
                  {/* <a
                    href="#"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    Team
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    Projects
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    Calendar
                  </a> */}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <a
                  className="rounded-full bg-white p-1 mx-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  href="https://github.com/abhishandy/thegoodstr"
                  target="_blank"
                >
                  <span className="sr-only">Open Github</span>
                  <FaGithub className="h-6 w-6" aria-hidden="true" />
                </a>

                {/* Profile dropdown */}
                {/* <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu> */}
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {/* Current: "bg-gray-50 border-gray-500 text-gray-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <Disclosure.Button
                as="a"
                href="/discover"
                className={
                  "block border-l-4 py-2 pl-3 pr-4 text-base font-medium" +
                  (currentPage === "discover"
                    ? " border-gray-500 bg-gray-50 text-gray-700"
                    : " border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700")
                }
              >
                Discover
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/sell"
                className={
                  "block border-l-4 py-2 pl-3 pr-4 text-base font-medium" +
                  (currentPage === "sell"
                    ? " border-gray-500 bg-gray-50 text-gray-700"
                    : " border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700")
                }
              >
                Sell
              </Disclosure.Button>
              {/* <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Projects
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Calendar
              </Disclosure.Button> */}
            </div>
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="flex justify-end px-4">
                {/* <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    Tom Cook
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    tom@example.com
                  </div>
                </div> */}
                <button
                  type="button"
                  className="flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Manage wallet</span>
                  <WalletIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <a
                  className="flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  href="https://github.com/abhishandy/thegoodstr"
                  target="_blank"
                >
                  <span className="sr-only">Open Github</span>
                  <FaGithub className="h-6 w-6" aria-hidden="true" />
                </a>
              </div>
              {/* <div className="mt-3 space-y-1">
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                  Your Profile
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                  Settings
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                  Sign out
                </Disclosure.Button>
              </div> */}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
