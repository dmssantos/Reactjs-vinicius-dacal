import * as yup from 'yup';

export default yup.object().shape({
  title: yup.string().required('Campo Obrigatório'),
  url: yup.string().url('URL inválida').required('Campo Obrigatório'),
  imageUrl: yup.string().url('URL inválida').required('Campo Obrigatório'),
  price: yup.number().required('Campo Obrigatório')
})