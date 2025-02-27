import Payment from '../common/Payment';

function PaymentType({ title, SubTitleH3, agree, car, totalPrice }) {

    const paymentSucessHandler = () => {
        console.log("결제 성공!");
    }

    return (
        <div style={{marginBottom: 0}}>
            <SubTitleH3>{title}</SubTitleH3>
            <Payment
                payAmount={1000}
                reservationNum={`RES_${Date.now()}`}
                onPaymentSuccess={paymentSucessHandler}
                agree={agree}
                car={car}
                totalPrice={totalPrice}
            />
        </div>
    );
}

export default PaymentType;