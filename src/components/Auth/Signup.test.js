import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Signup from './Signup'

describe('signup testing',()=>{
    test('signup form rendering properly',()=>{
        render(<Signup/>)
        const emaillabel=screen.getByText(/Email/i);
        const passwordlabel=screen.getByText('Password');
        const confirmpasswordlabel=screen.getByText(/Confirm Password/i);
        expect(emaillabel).toBeInTheDocument();
        expect(passwordlabel).toBeInTheDocument();
        expect(confirmpasswordlabel).toBeInTheDocument();

        const emailinput=screen.getByLabelText(/Email/i);
        const passwordinput=screen.getByLabelText('Password');
        expect(emailinput).toHaveAttribute('type','email');
        expect(passwordinput).toHaveAttribute('type','password');
    })

    test('btn is disabled if email is empty',() => {
        render(<Signup/>)
        const emailinput=screen.getByLabelText(/Email/i);
        fireEvent.change(emailinput,{target:{value:''}})
        const btn=screen.getByRole('button',{'name':'Sign Up'})
        expect(btn).toHaveAttribute('disabled','')
    })
    test('btn is disabled if password and confirm password dont match',() => {
        render(<Signup/>)
        const passwordinput=screen.getByLabelText('Password');
        const confirmpasswordinput=screen.getByLabelText('Confirm Password');
        fireEvent.change(passwordinput,{target:{value:'test123'}})
        fireEvent.change(confirmpasswordinput,{target:{value:'test456'}})
        const btn=screen.getByRole('button',{'name':'Sign Up'})
        expect(btn).toHaveAttribute('disabled','')
    })
    test('btn is not disabled if email is not empty',() => {
        render(<Signup/>)
        const emailinput=screen.getByLabelText(/Email/i);
        fireEvent.change(emailinput,{target:{value:'test'}})
        const btn=screen.getByRole('button',{'name':'Sign Up'})
        expect(btn).not.toHaveAttribute('disabled','')
    })
    test('btn is not disabled if password and confirm password match',() => {
        render(<Signup/>)
        const passwordinput=screen.getByLabelText('Password');
        const confirmpasswordinput=screen.getByLabelText('Confirm Password');
        const emailinput=screen.getByLabelText(/Email/i);
        fireEvent.change(emailinput,{target:{value:'test'}})
        fireEvent.change(passwordinput,{target:{value:'test123'}})
        fireEvent.change(confirmpasswordinput,{target:{value:'test123'}})
        const btn=screen.getByRole('button',{'name':'Sign Up'})
        expect(btn).not.toHaveAttribute('disabled','')
    })
})