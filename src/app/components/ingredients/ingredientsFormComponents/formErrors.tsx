type FormErrorsProps = {
  errors: string[];
};

const FormErrors = ({ errors }: FormErrorsProps) => (
  <div className="mt-2 text-center">
    {errors.length > 0 && errors.map((err) => <p key={err} className='text-red-500'> {err} </p>)}
  </div>
);

export default FormErrors