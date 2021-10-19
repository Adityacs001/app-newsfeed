import * as React from "react";
import { Menu, Popover, Transition, Dialog } from "@headlessui/react";
import { CalendarIcon, RefreshIcon, SearchIcon } from "@heroicons/react/solid";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";

import { MainWrapper, ContentWrapper, FooterWrapper } from "./styles/wrappers";
import News from "./model/news";
import Spinner from "./components/Spinner";

const classNames = (...classes: Array<string>) => {
  return classes.filter(Boolean).join(" ");
};

const getFormattedDate = (input: string): string => {
  let formatteddate: string = input;
  try {
    formatteddate = input.toString().split("T")[0];
  } catch {}

  return formatteddate;
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>();
  const [newlist, setNewlist] = React.useState<Array<News>>();
  const [selectednews, setSelectedNews] = React.useState<News>();
  const [shownews, setShowNews] = React.useState<boolean>(false);

  async function fetchdata() {
    await fetch(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=c3462c7d8202468e916b6e7a98f80472"
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((news) => setNewlist(news?.articles))
      .finally(() => {
        setIsLoading(false);
        setShowNews(false);
      });
  }

  React.useEffect(() => {
    setIsLoading(true);
    fetchdata();
  }, []);

  React.useEffect(() => {
    if (!shownews) setSelectedNews(undefined);
  }, [shownews]);

  const user = {
    name: "Aditya Kumar",
    email: "aditya@kumar.com",
    imageUrl: "/aditya.png",
  };

  const userNavigation = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "#" },
  ];

  const footerNav = [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
    { name: "Press", href: "#" },
    { name: "Accessibility", href: "#" },
    { name: "Partners", href: "#" },
  ];

  return (
    <MainWrapper className="antialiased sm:overflow-x-hidden bg-gray-50">
      <ContentWrapper>
        <Popover
          as="header"
          className={({ open }) =>
            classNames(
              open ? "fixed inset-0 z-40 overflow-y-auto" : "",
              "bg-white shadow-sm lg:static lg:overflow-y-visible"
            )
          }
        >
          {({ open }) => (
            <>
              <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
                  <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                    <div className="flex items-center flex-shrink-0">
                      <a href="/">
                        <img
                          className="block w-auto h-8"
                          src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                          alt="Workflow"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 md:px-8 lg:px-0 xl:col-span-6">
                    <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                      <div className="w-full">
                        <label htmlFor="search" className="sr-only">
                          Search
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <SearchIcon
                              className="w-5 h-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </div>
                          <input
                            id="search"
                            name="search"
                            className="block w-full py-2 pl-10 pr-3 text-sm placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Search"
                            type="search"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
                    <Popover.Button className="inline-flex items-center justify-center p-2 -mx-2 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Open menu</span>
                      {open ? (
                        <XIcon className="block w-6 h-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block w-6 h-6"
                          aria-hidden="true"
                        />
                      )}
                    </Popover.Button>
                  </div>
                  <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                    <a
                      href="/"
                      className="flex-shrink-0 p-1 ml-5 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="w-6 h-6" aria-hidden="true" />
                    </a>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative flex-shrink-0 ml-5">
                      <div>
                        <Menu.Button className="flex bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="w-8 h-8 rounded-full"
                            src={user.imageUrl}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={React.Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block py-2 px-4 text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>

              <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="flex items-center max-w-3xl px-4 mx-auto sm:px-6">
                    <div className="flex-shrink-0">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="flex-shrink-0 p-1 ml-auto text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="w-6 h-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="max-w-3xl px-2 mx-auto mt-3 space-y-1 sm:px-4">
                    {userNavigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2 text-base font-medium text-gray-500 rounded-md hover:bg-gray-50 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </>
          )}
        </Popover>
        <div className="px-4 py-6 mx-auto border-b border-gray-200 sm:max-w-6xl">
          <div className="flex items-start justify-between w-full mb-2 ">
            <h3 className="mb-3 text-2xl font-medium leading-6 text-gray-900">
              Recent News
            </h3>
            <div className="">
              <button
                onClick={() => {
                  setIsLoading(true);
                  fetchdata();
                }}
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <RefreshIcon
                  className="w-5 h-5 mr-2 -ml-1"
                  aria-hidden="true"
                />
                Refresh
              </button>
            </div>
          </div>
          {isLoading ? (
            <span className="text-lg font-semibold text-gray-800">
              <Spinner />
            </span>
          ) : (
            <React.Suspense
              fallback={
                <span className="text-lg font-semibold text-gray-800">
                  <Spinner />
                </span>
              }
            >
              <ul className="bg-white divide-y-2 divide-gray-100 group">
                {newlist &&
                  newlist.map((val, index) => (
                    <li
                      onClick={() => {
                        setSelectedNews(val);
                        setShowNews(true);
                      }}
                      key={index}
                      className="cursor-pointer hover:bg-gray-200 focus:ring-2 focus-within:ring-2 focus-within:ring-indigo-500"
                    >
                      <div className="flex py-3">
                        <div className="relative flex-none hidden w-64 sm:block">
                          <img
                            src={val?.urlToImage}
                            alt="some"
                            className="absolute inset-0 object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-auto p-6">
                          <div className="flex flex-wrap">
                            <h1 className="flex-auto text-xl font-semibold">
                              {val?.title}
                            </h1>
                            <div className="flex items-center w-full mt-2 text-sm font-medium text-gray-500">
                              <CalendarIcon className="w-6 h-6"></CalendarIcon>
                              <span className="px-2">
                                {getFormattedDate(val?.publishedAt)}
                              </span>
                            </div>
                          </div>
                          <p className="mt-2 text-sm text-gray-500">
                            {val?.description}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </React.Suspense>
          )}
        </div>
        <Transition.Root show={shownews} as={React.Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 overflow-hidden"
            onClose={() => setShowNews(false)}
          >
            <div className="absolute inset-0 overflow-hidden">
              <Transition.Child
                as={React.Fragment}
                enter="ease-in-out duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="absolute inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
              </Transition.Child>
              <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={React.Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <div className="relative w-screen max-w-2xl">
                    {selectednews && (
                      <div className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl">
                        <div className="px-4 py-6 bg-indigo-700 sm:px-6">
                          <div className="flex items-center justify-between">
                            <Dialog.Title className="text-lg font-medium text-white">
                              News Details
                            </Dialog.Title>
                            <div className="flex items-center ml-3 h-7">
                              <button
                                type="button"
                                className="text-indigo-200 bg-indigo-700 rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                onClick={() => setShowNews(false)}
                              >
                                <span className="sr-only">Close panel</span>
                                <XIcon className="w-6 h-6" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                          <div className="mt-1">
                            <p className="text-sm text-indigo-300"></p>
                          </div>
                        </div>
                        <div className="relative flex-1 px-4 pb-6 mt-6 sm:px-6">
                          <div className="relative py-2 overflow-hidden bg-white">
                            <div className="relative px-4 sm:px-6 lg:px-8">
                              <div className="mx-auto text-lg max-w-prose">
                                <h1>
                                  <span className="block text-base font-semibold tracking-wide text-center text-indigo-600 uppercase">
                                    {getFormattedDate(
                                      selectednews?.publishedAt
                                    )}
                                  </span>
                                  <span className="block mt-2 font-extrabold leading-8 tracking-tight text-center text-gray-900 underline hover:text-indigo-700 sm:text-4xl">
                                    <a
                                      href={selectednews?.url}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      {selectednews?.title}
                                    </a>
                                  </span>
                                </h1>
                                <p className="mt-8 text-xl leading-8 text-gray-500">
                                  {selectednews?.description}
                                </p>
                              </div>
                              <div className="mx-auto mt-6 prose prose-lg text-gray-500 prose-indigo">
                                <figure>
                                  <img
                                    className="w-full rounded-lg"
                                    src={`${selectednews?.urlToImage}`}
                                    alt="News details"
                                    width={1310}
                                    height={873}
                                  />
                                  <figcaption></figcaption>
                                </figure>
                                <p className="py-1">{selectednews?.content}</p>
                                <p className="py-2">
                                  {selectednews?.author && (
                                    <span className="flex">
                                      {" "}
                                      <span>By </span>{" "}
                                      <span className="px-2 text-lg font-semibold text-gray-800">
                                        {" "}
                                        {selectednews?.author}
                                      </span>{" "}
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </ContentWrapper>
      <FooterWrapper>
        <footer className="bg-white">
          <div className="px-4 py-12 mx-auto overflow-hidden max-w-7xl sm:px-6 lg:px-8">
            <nav
              className="flex flex-wrap justify-center -mx-5 -my-2"
              aria-label="Footer"
            >
              {footerNav.map((item) => (
                <div key={item.name} className="px-5 py-2">
                  <a
                    href={item.href}
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    {item.name}
                  </a>
                </div>
              ))}
            </nav>

            <p className="mt-8 text-base text-center text-gray-400">
              &copy; 2021 Musala News Feed Evaluation, Inc. All rights reserved.
            </p>
          </div>
        </footer>
      </FooterWrapper>
    </MainWrapper>
  );
};

export default App;
