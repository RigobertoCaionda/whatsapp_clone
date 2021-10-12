import './NewChat.css';
import {useState, useEffect} from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import api from '../api';
const Page = ({user, chatlist, show, setShow}) => {
	const [list, setList] = useState([]);//Lista de contatos
	const handleClose = () => {
		setShow(false);
	}
	useEffect(()=>{
		const getList = async () => {
			if (user !== null) {
				let results = await api.getContactList(user.id);
				setList(results);
			}
		}
		getList();
	},[user]);

	const addNewChat = async (user2) => {
		await api.addNewChat(user, user2);
		handleClose();
	}

	return (
			<div className="newChat" style={{left: show ? 0 : -415}}>
				<div className="newChat--head">
					<div className="newChat--backbutton" onClick={handleClose}>
						<ArrowBackIcon style={{color: '#fff'}}/>
					</div>

					<div className="newChat--headtitle">Nova Conversa</div>
				</div>

				<div className="newChat--list">
					{list.map((item, key)=>(
							<div className="newChat--item" key={key} onClick={()=>addNewChat(item)}>
								<img className="newChat--itemavatar" src={item.avatar} alt="" />
								<div className="newChat--itemname">{item.name}</div>
							</div>
						))}
				</div>
			</div>
		);
}
export default Page;