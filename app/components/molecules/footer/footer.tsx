import logoDark from '~/components/icons/logo-dark.svg';
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
					<a href="#">Connells</a> ©2026. All rights reserved.
				</div>
			</div>
		</footer>
	);
};
