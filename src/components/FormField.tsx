import { Input } from '@/components/ui/input';
import { IconType } from 'react-icons';

interface IconFormFieldProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  icon: IconType;
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur: (e: React.FocusEvent<any>) => void;
  error?: string;
  touched?: boolean;
}

export const IconFormField = ({
  id,
  name,
  type,
  placeholder,
  icon: Icon,
  value,
  onChange,
  onBlur,
  error,
  touched,
}: IconFormFieldProps) => (
  <div>
    <div className="flex items-center border-b-2 border-slate-500 dark:border-gray-600 py-2">
      <Icon size={20} className="mr-3 text-gray-500 dark:text-gray-400" />
      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="w-full bg-transparent border-none focus:outline-none text-gray-800 dark:text-gray-200"
      />
    </div>
    {touched && error && (
      <div className="text-red-500 text-sm mt-1">{error}</div>
    )}
  </div>
);