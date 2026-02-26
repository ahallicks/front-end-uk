import type { IGlobalData } from '~/services/get-global-data.ts';

import { useState } from 'react';
import { Link } from 'react-router';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { buildPageUrl } from '~/utils/build-url.ts';

export const HeaderComponent: React.FC<IGlobalData> = ({
	siteName,
	logo,
	logoAltText,
	navigationLinks,
}) => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	return (
		<header className="sticky top-0 z-51 inset-x-0 backdrop-blur-lg">
			<nav
				aria-label="Global"
				className="flex items-center justify-between p-6 lg:px-8"
			>
				<div className="flex lg:flex-1">
					<Link to="/" rel="home" className="-m-1.5 p-1.5">
						<span className="sr-only">{siteName}</span>
						<img
							alt={logoAltText}
							src={logo.url}
							className="h-8 w-auto"
						/>
					</Link>
				</div>
				<div className="flex lg:hidden">
					<button
						type="button"
						onClick={() => setMobileMenuOpen(true)}
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
					>
						<span className="sr-only">Open main menu</span>
						<Bars3Icon aria-hidden="true" className="size-6" />
					</button>
				</div>
				<div className="hidden lg:flex lg:gap-x-12">
					{navigationLinks.map((item) => (
						<Link
							key={item.linkText}
							to={buildPageUrl(item)}
							className="text-sm/6 font-semibold text-gray-900 dark:text-gray-100"
						>
							{item.linkText}
						</Link>
					))}
				</div>
				<div className="hidden lg:flex lg:flex-1 lg:justify-end">
					<a
						href="#"
						className="text-sm/6 font-semibold text-gray-900 dark:text-gray-100"
					>
						Log in <span aria-hidden="true">&rarr;</span>
					</a>
				</div>
			</nav>
			<Dialog
				open={mobileMenuOpen}
				onClose={setMobileMenuOpen}
				className="lg:hidden"
			>
				<div className="fixed inset-0 z-50" />
				<DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
					<div className="flex items-center justify-between">
						<Link to="/" rel="home" className="-m-1.5 p-1.5">
							<span className="sr-only">{siteName}</span>
							<img
								alt={logoAltText}
								src={logo.url}
								className="h-8 w-auto"
							/>
						</Link>
						<button
							type="button"
							onClick={() => setMobileMenuOpen(false)}
							className="-m-2.5 rounded-md p-2.5 text-gray-700"
						>
							<span className="sr-only">Close menu</span>
							<XMarkIcon aria-hidden="true" className="size-6" />
						</button>
					</div>
					<div className="mt-6 flow-root">
						<div className="-my-6 divide-y divide-gray-500/10">
							<div className="space-y-2 py-6">
								{navigationLinks.map((item) => (
									<Link
										key={item.linkText}
										to={buildPageUrl(item)}
										className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
									>
										{item.linkText}
									</Link>
								))}
							</div>
							<div className="py-6">
								<a
									href="#"
									className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
								>
									Log in
								</a>
							</div>
						</div>
					</div>
				</DialogPanel>
			</Dialog>
		</header>
	);
};
