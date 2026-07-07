/*import logoDark from '~/components/icons/logo-dark.svg';
import logoLight from '~/components/icons/logo-light.svg';

export const Footer: React.FC = () => {
	return (
		<footer className="w-full bg-linear-to-b from-[#F1EAFF] to-[#FFFFFF] text-gray-800">
			<div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
				<div className="flex items-center space-x-3 mb-6">
					<img
						src={logoLight}
						alt="React Router"
						className="block w-2xs dark:hidden"
					/>
					<img
						src={logoDark}
						alt="React Router"
						className="hidden w-2xs dark:block"
					/>
				</div>
				<p className="text-center max-w-xl text-sm font-normal leading-relaxed">
					Empowering creators worldwide with the most advanced AI
					content creation tools. Transform your ideas into reality.
				</p>
			</div>
			<div className="border-t border-slate-200">
				<div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal">
					<a href="/" rel="home">
						Connells
					</a>{' '}
					©2026. All rights reserved.
				</div>
			</div>
		</footer>
	);
}; */

import type { IGlobalData } from '~/services/get-global-data.ts';

import { Link } from 'react-router';

import { buildPageUrl } from '~/utils/build-url.ts';

export const Footer: React.FC<IGlobalData> = ({
	siteName,
	logo,
	logoAltText,
	navigationLinks,
}) => (
	<footer className="bg-neutral-primary-soft m-4 rounded-md shadow-xs ring-1 ring-gray-900/10 dark:ring-white/10">
		<div className="mx-auto w-full max-w-7xl p-4 md:py-8">
			<div className="sm:flex sm:items-center sm:justify-between">
				<Link
					to="/"
					rel="home"
					className="mb-4 flex items-center space-x-3 sm:mb-0 rtl:space-x-reverse"
				>
					<span className="sr-only">{siteName}</span>
					<img
						alt={logoAltText}
						src={logo.url}
						className="h-8 w-auto"
					/>
				</Link>
				<ul className="text-body mb-6 flex flex-wrap items-center gap-4 text-sm font-medium sm:mb-0">
					{navigationLinks.map((item) => (
						<li key={item.linkText}>
							<Link
								to={buildPageUrl(item)}
								className="text-sm/6 font-semibold text-gray-900 dark:text-gray-100"
							>
								{item.linkText}
							</Link>
						</li>
					))}
				</ul>
			</div>
			<hr className="border-default my-6 border-gray-900/10 sm:mx-auto lg:my-8 dark:border-white/10" />
			<span className="text-body block text-sm sm:text-center">
				© 2026{' '}
				<a href="https://flowbite.com/" className="hover:underline">
					Alex Hall
				</a>{' '}
				@ Code Computerlove. All Rights Reserved.
			</span>
		</div>
	</footer>
);
