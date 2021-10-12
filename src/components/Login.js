import './Login.css';
import api from '../api';
const Page = ({onReceive}) => {
	const handleFacebookLogin = async () => {
		let result = await api.fbPopup();
		if (result) {
			onReceive(result.user);//A prop onReceive esta la no App (Login), nesse caso estamos passando o resultado como parametro da funcao onReceive
		} else {
			alert('Erro!');
		}
	}
	return (
			<div className="login">
				<button onClick={handleFacebookLogin}>Logar com facebook</button>
			</div>
		);
}
export default Page;