import { FormField } from './components/field/field.tsx';
import { Input } from './components/input/input.tsx';
import { Label } from './components/label/label.tsx';
import { Textarea } from './components/textarea/textarea.tsx';

export type TForm = React.PropsWithChildren & {
	className?: string;
};

export const Form = {
	Input,
	FormField,
	Label,
	Textarea,
};
