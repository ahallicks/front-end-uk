import {
	AcademicCapIcon,
	ArrowRightCircleIcon,
	Bars3Icon,
	BookOpenIcon,
	ChartBarIcon,
	ChartBarSquareIcon,
	ChartPieIcon,
	CheckCircleIcon,
	CheckIcon,
	ChevronDownIcon,
	CloudArrowUpIcon,
	CodeBracketIcon,
	CodeBracketSquareIcon,
	CommandLineIcon,
	DocumentIcon,
	ExclamationCircleIcon,
	ExclamationTriangleIcon,
	LockClosedIcon,
	PencilIcon,
	PencilSquareIcon,
	ServerIcon,
	SparklesIcon,
	WrenchIcon,
	WrenchScrewdriverIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';
import { createElement } from 'react';

const iconmapper = (icon: string): React.ElementType => {
	switch (icon) {
		case 'academicCapIcon':
			return AcademicCapIcon;
		case 'arrowRightCircleIcon':
			return ArrowRightCircleIcon;
		case 'bars3Icon':
			return Bars3Icon;
		case 'bookOpenIcon':
			return BookOpenIcon;
		case 'chartBarIcon':
			return ChartBarIcon;
		case 'chartBarSquareIcon':
			return ChartBarSquareIcon;
		case 'chartPieIcon':
			return ChartPieIcon;
		case 'checkCircleIcon':
			return CheckCircleIcon;
		case 'checkIcon':
			return CheckIcon;
		case 'chevronDownIcon':
			return ChevronDownIcon;
		case 'cloudArrowUpIcon':
			return CloudArrowUpIcon;
		case 'codeBracketIcon':
			return CodeBracketIcon;
		case 'codeBracketSquareIcon':
			return CodeBracketSquareIcon;
		case 'commandLineIcon':
			return CommandLineIcon;
		case 'documentIcon':
			return DocumentIcon;
		case 'exclamationCircleIcon':
			return ExclamationCircleIcon;
		case 'exclamationTriangleIcon':
			return ExclamationTriangleIcon;
		case 'lockClosedIcon':
			return LockClosedIcon;
		case 'pencilIcon':
			return PencilIcon;
		case 'pencilSquareIcon':
			return PencilSquareIcon;
		case 'serverIcon':
			return ServerIcon;
		case 'sparklesIcon':
			return SparklesIcon;
		case 'wrenchIcon':
			return WrenchIcon;
		case 'wrenchScrewdriverIcon':
			return WrenchScrewdriverIcon;
		case 'xMarkIcon':
			return XMarkIcon;
		default:
			return DocumentIcon;
	}
};

export const Icon: React.FC<{ icon: string; className?: string }> = ({
	icon,
	className,
}) => {
	return createElement(iconmapper(icon), {
		'aria-hidden': 'true',
		className,
	});
};

export const LoadIcon: React.FC<{ width: number; height: number }> = ({
	width,
	height,
}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 300 150"
		width={width}
		height={height}
	>
		<path
			fill="none"
			stroke="currentColor"
			strokeWidth="15"
			strokeLinecap="round"
			strokeDasharray="300 385"
			strokeDashoffset="0"
			d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
		>
			<animate
				attributeName="stroke-dashoffset"
				calcMode="spline"
				dur="2"
				values="685;-685"
				keySplines="0 0 1 1"
				repeatCount="indefinite"
			></animate>
		</path>
	</svg>
);
