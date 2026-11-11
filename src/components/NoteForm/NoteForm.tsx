import css from "./NoteForm.module.css";
import { useId } from 'react';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers, } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../services/noteService";


interface NoteFormProps {
  onClose: () => void;
  
}

interface NoteFormValues{
  title: string;
  content: string;
   tag: "Todo" | "Work" |"Personal" | "Meeting" | "Shopping",
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
    .max(500, 'Message too long'),
  tag: Yup.string()
    .required("Select tag")
})


function NoteForm({ onClose }: NoteFormProps) {
  const fieldId = useId();
  
  const queryClient = useQueryClient();

  const { mutate} = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    }
    })

   
  
   

  const handleSubmit = (
    values: NoteFormValues, 
     actions: FormikHelpers<NoteFormValues>
   ) => {
    
    mutate(values);
    actions.resetForm()
     onClose();
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