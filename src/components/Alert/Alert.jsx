import Rocket from './../../assets/images/rocket.png';
import AlexUser from './../../assets/images/alexa.png';

const AlertCard = () => {
    return (
        <div className="alert-card w-[490px]">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <img src={AlexUser} alt="Alexa" />
                    <h2 className="ml-3 font-medium text-[12px]">Siri Alexa</h2>
                </div>
                <h3 className="text-[12px] font-medium text-black">now</h3>
            </div>
            <div className="flex items-end justify-between">
                <div className="mr-4">
                    <h4 className="font-medium text-[16px]">Lorem Ipsem Ipsem</h4>
                    <p className="font-normal text-[12px]">
                        Lorem ipsem, lorem ipsem, lorem Lorem ipsem, lorem ipsem, loremLorem ipsem, lorem ipsem, lorem
                    </p>
                </div>
                <div>
                    <img src={Rocket} alt="Rocket" />
                </div>
            </div>
        </div>
    )
}

export default AlertCard;