import * as yup from "yup";
export const ProductValidations = yup.object({
  title: yup.string().required("Please enter product title"),
  description: yup.string().required("Please enter description"),
 
});

export const defaultValue = {
    image:'',
    posision: '',
    title: "",
    description: "", 
};
