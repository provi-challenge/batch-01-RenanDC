import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import logo from '../../logo.svg';
import InputMask from 'react-input-mask';
import { getCourse } from '../../services/Courses';
import { getFinancing } from '../../services/Financing';
import { postCustomer, putCustomer } from '../../services/Customer';
import { getPayments } from '../../services/Payment';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonGroup, ToggleButton, Modal, Form, Button }  from 'react-bootstrap';

const PaymentView = () => {
    const navigate = useNavigate();
    let { id } = useParams();
    console.log(id)

    useEffect(() => {
        const courses = getCourse(id)

        courses.then(response => setCourses(response.data))
        console.log(courses)
    }, [])
    
    const { register, handleSubmit } = useForm();
    const { register: registerPay, handleSubmit: handleSubmitPay } = useForm();
    const [radioValue, setRadioValue] = useState('1');
    const [courses, setCourses] = useState();
    const [financing, setFinancing] = useState();
    const [payments, setPayments] = useState();
    const [disabled, setDisabled] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [idCustomer, setIdCustomer] = useState();
    const [show, setShow] = useState(false);

    const percValue = (value, perc) => {
        return value * perc / 100
    }

    const handleClose = () => {
        navigate("/");
    }

    const onSubmit = (data) => {
        data['input_value'] = radioValue

        const idCustomer = postCustomer(data)
        idCustomer.then(response => setIdCustomer(response.data))
        const form_financing = getFinancing(radioValue)
        form_financing.then(response => setFinancing(response.data))
        const form_payments = getPayments()
        form_payments.then(response => setPayments(response.data))

        setDisabled(true)
        setShowPayment(true)

        data['course_id'] = id
        console.log(data)
    }

    const onSubmitPay = (data) => {
        data['id'] = idCustomer.id
        putCustomer(data)
        setShow(true)
    }

    const Payment = () => (
        <div className="py-8 px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
            <form id="payment" onSubmit={handleSubmitPay(onSubmitPay)}>
                <label htmlFor="financing" className="pb-2 text-sm font-bold text-gray-800">
                    Escolha o Financiamento
                </label>
                <Form.Select {...registerPay("id_financing")} aria-label="Default select example">
                    {financing?.map(fin => (
                        <option value={fin.id}>{fin.description}</option>
                    ))}
                </Form.Select>
                <label htmlFor="pay" className="pb-2 text-sm font-bold text-gray-800">
                    Forma de pagamento
                </label>
                <Form.Select {...registerPay("id_payment")} aria-label="Default select example">
                    {payments?.map(pay => (
                        <option value={pay.id}>{pay.description}</option>
                    ))}
                </Form.Select>
                <div className="container mx-auto w-11/12 xl:w-full">
                    <div className="w-full py-4 sm:px-15 bg-white dark:bg-gray-800 flex justify-left">
                        <button 
                            className="bg-gray-200 focus:outline-none transition duration-150 ease-in-out hover:bg-gray-300 dark:bg-gray-700 rounded text-indigo-600 dark:text-indigo-600 px-6 py-2 text-xs mr-4"
                            onClick={handleClose}
                        >
                            Cancelar
                        </button>
                        <button 
                            className="bg-indigo-700 focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-2 text-sm" 
                            type="submit"
                        >
                            Comprar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    ) 

    const submitOk = () => {

    }

    const radios = [
        { name: percValue(courses?.price, 10), value: '10' },
        { name: percValue(courses?.price, 20), value: '20' },
        { name: percValue(courses?.price, 30), value: '30' },
    ];

    return (
            <div className="bg-white dark:bg-gray-800">
                <div className="container mx-auto bg-white dark:bg-gray-800 rounded">
                    <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-3 bg-white dark:bg-gray-800">
                        <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                            <img src={logo} alt="logo" />
                        </div>
                    </div>
                </div>
                <div className="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
                    <div className="flex-grow bg-white px-6 py-8 lg:p-12">
                        <form id="payment" onSubmit={handleSubmit(onSubmit)}>
                            <div className="mx-auto pt-4">
                                <div className="container  mx-auto">
                                    <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                        <label htmlFor="Name" className="pb-2 text-sm font-bold text-gray-800">
                                            Nome Completo
                                        </label>
                                        <input type="text" disabled = {disabled? "disabled" : ""} {...register("name")} name="name" required className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
                                    </div>
                                    <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                        <label htmlFor="Email" className="pb-2 text-sm font-bold text-gray-800">
                                            Email
                                        </label>
                                        <div className="border border-green-400 shadow-sm rounded flex">
                                            <div className="px-4 py-3 flex items-center border-r border-green-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <rect x={3} y={5} width={18} height={14} rx={2} />
                                                    <polyline points="3 7 12 13 21 7" />
                                                </svg>
                                            </div>
                                            <input type="text" disabled = {disabled? "disabled" : ""} {...register("email")} name="email" required className="pl-3 py-3 w-full text-sm focus:outline-none placeholder-gray-500 rounded bg-transparent text-gray-500 dark:text-gray-400" placeholder="example@gmail.com" />
                                        </div>
                                    </div>
                                    <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                        <label htmlFor="cpf" className="pb-2 text-sm font-bold text-gray-800">
                                            CPF
                                        </label>
                                        <InputMask 
                                            {...register("cpf")}
                                            id="cpf" 
                                            name="cpf"
                                            disabled = {disabled? "disabled" : ""}
                                            mask="999.999.999-99"
                                            required 
                                            className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 text-gray-500 dark:text-gray-400"
                                        />
                                    </div>
                                    <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                        <label htmlFor="Country" className="pb-2 text-sm font-bold text-gray-800">
                                            Valor de Entrada
                                        </label>
                                        <ButtonGroup>
                                            {radios.map((radio, idx) => (
                                                <ToggleButton
                                                    disabled = {disabled? "disabled" : ""}
                                                    key={idx}
                                                    id={`radio-${idx}`}
                                                    type="radio"
                                                    variant="outline-primary"
                                                    name="input_value"
                                                    value={radio.value}
                                                    checked={radioValue === radio.value}
                                                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                                                >
                                                    {radio.name}
                                                </ToggleButton>
                                            ))}
                                        </ButtonGroup>
                                    </div>
                                </div>
                            </div>
                            { !showPayment ? 
                            <div className="container mx-auto w-11/12 xl:w-full">
                                <div className="w-full py-4 bg-white dark:bg-gray-800 flex justify-left">
                                    <button 
                                        className="bg-gray-200 focus:outline-none transition duration-150 ease-in-out hover:bg-gray-300 dark:bg-gray-700 rounded text-indigo-600 dark:text-indigo-600 px-6 py-2 text-xs mr-4"
                                        onClick={handleClose}
                                    >
                                        Cancelar
                                    </button>
                                    <button 
                                        className="bg-indigo-700 focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-2 text-sm" 
                                        type="submit"
                                    >
                                        Enviar
                                    </button>
                                </div>
                            </div>
                            : null }
                        </form>
                    </div>
                    { showPayment ? <Payment /> : null }
                </div>
                <Modal 
                  show={show} 
                  onHide={handleClose}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Compra Efetuada</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className="mt-6 text-base text-gray-500">
                        Obrigado por confiar na Provi!
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button href="/">OK</Button>
                    </Modal.Footer>
                </Modal>
            </div>
    );
};
export default PaymentView;
