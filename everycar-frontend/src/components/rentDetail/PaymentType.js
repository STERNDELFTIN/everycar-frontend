import Payment from '../common/Payment';

function PaymentType({ title, SubTitleH3, agree, car, totalPrice, return_location, selectedCity, selectedRegion }) {

    const paymentSucessHandler = () => {
        // console.log("결제 성공!");
    }

    // console.log("return_location:", return_location);
    return (
        <div style={{marginBottom: 0}}>
            {/* <SubTitleH3>{title}</SubTitleH3> */}
            <Payment
                payAmount={totalPrice}
                onPaymentSuccess={paymentSucessHandler}
                agree={agree}
                car={car}
                return_location={return_location}
                selectedCity={selectedCity}
                selectedRegion={selectedRegion}
            />
        </div>
    );
}

export default PaymentType;