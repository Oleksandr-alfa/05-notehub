import css from "./NoteForm.module.css";
import { useId } from 'react';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers} from 'formik';
import * as Yup from 'yup';


interface NoteFormProps {
  onClose?: () => void;
  onSubmitNote?: (values: NoteFormValues) => void;
}

interface NoteFormValues{
  title: string;
  content: string;
  tag: string;
}

const initialValues: NoteFormValues = {
  title: '',
  content: '',
  tag: 'Todo',
 
};

const validationSchema = Yup.object().shape({
  title: Yup.string()
  .min(3, "Name too short")
  .max(50, "Name too long")
    .required("Name is required"),
  content: Yup.string()
   .min(5, 'Message too short')
    .max(300, 'Message too long')
    .required("It isn't note!"),
  tag: Yup.string()
    .required("Select tag")
})


function NoteForm({onClose, onSubmitNote}: NoteFormProps) {
  const fieldId = useId();
  
   
   

   const handleSubmit = (
    values: NoteFormValues,
    actions: FormikHelpers<NoteFormValues>
  ) => {
    
     if (onSubmitNote) onSubmitNote(values);
     actions.resetForm();
    if (onClose) onClose();
  };
  return (<Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
    onSubmit={handleSubmit}>
    <Form className={css.form}>
  <fieldset className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
    <Field id={`${fieldId}-title`} type="text" name="title" className={css.input} />
    <ErrorMessage name="title" component="span" className={css.error} />
  </fieldset>

  <fieldset className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
          as="textarea"
      id={`${fieldId}-content`}
      name="content"
      rows={8}
      className={css.textarea}
    />
    <ErrorMessage name="content" component="span" className={css.error} />
  </fieldset>

  <fieldset className={css.formGroup}>
    <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <Field as="select" id={`${fieldId}-tag`} name="tag" className={css.select}>
          
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </Field>
    <ErrorMessage name="tag" component="span" className={css.error} />
  </fieldset>

  <div className={css.actions}>
        <button onClick={ onClose} type="button" className={css.cancelButton}>
      Cancel
    </button>
        <button
                type="submit"
                className={css.submitButton}
                disabled={false}
    >
      Create note
    </button>
  </div>
      </Form>
    </Formik>
  )
};

export default NoteForm;