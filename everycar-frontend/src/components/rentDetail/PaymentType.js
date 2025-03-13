import Payment from '../common/Payment';

function PaymentType({ title, SubTitleH3, agree, car, totalPrice, return_location }) {

    const paymentSucessHandler = () => {
        console.log("결제 성공!");
    }

    return (
        <div style={{marginBottom: 0}}>
            {/* <SubTitleH3>{title}</SubTitleH3> */}
            <Payment
                payAmount={totalPrice}
                onPaymentSuccess={paymentSucessHandler}
                agree={agree}
                car={car}
                return_location={return_location}
            />
        </div>
    );
}

export default PaymentType;