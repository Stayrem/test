import applicationStyles from '../../../../pages/application/Application.module.css'
import formStyles from './ApplicationForm.module.css'
import { Form, Input, Button, Select, DatePicker } from 'antd'
import { useRef, useEffect } from 'react'

import IMask from 'imask'

import {STATUS_DICT} from "../../../../constants";
import { useSelector, useDispatch } from 'react-redux';
import {getCountries} from "../../applicationSlice";
const maskOptions = {
    mask: '+{7}(000)000-00-00'
};

function ApplicationForm() {
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.default.application.countries);
    const formInputRef = useRef(null);
    const onFinish = values => {
    console.log(values)
  }

  useEffect(() => {
      dispatch(getCountries());
  }, [dispatch])

   useEffect(() => {
     if (formInputRef.current) {
       IMask(formInputRef.current.input, maskOptions)
     }
   }, [formInputRef.current, maskOptions])

  return (
    <>
      <h2 className={applicationStyles.applicationHeading}>Форма подачи заявки на обучение</h2>
      <p>Прием заявок осуществляется в период с 1 июля до 1 ноября</p>
      <h3>Обратите внимание:</h3>
      <ul>
        <li>1. Заявление подается на платное обучение</li>
        <li>2. Возраст заявителя должен находится в пределах от 18 до 40 лет</li>
      </ul>

      <h4>Заявка на обучение</h4>
      <Form onFinish={onFinish} size='large'>
        <Form.Item name='fio'>
          <Input placeholder='ФИО' className={formStyles.formInput} />
        </Form.Item>
        <Form.Item name='birthDate'>
          <DatePicker placeholder='Дата рождения' className={formStyles.formInput} />
        </Form.Item>
        <Form.Item name='sex'>
          <Select placeholder='Пол'>
            <Select.Option value='male'>Мужской</Select.Option>
            <Select.Option value='female'>Женский</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name='phone'>
            <Input placeholder='Телефон' ref={formInputRef}  />
        </Form.Item>
        <Form.Item name='country'>
          <Select options={countries.data} loading={countries.status === STATUS_DICT.PENDING} placeholder='Страна'  />
        </Form.Item>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form>
    </>
  )
}

export default ApplicationForm
