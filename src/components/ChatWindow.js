import {useState, useEffect, useRef} from 'react';
import './ChatWindow.css';
import MessageItem from './MessageItem';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';
import EmojiPicker from 'emoji-picker-react';
const Page = ({user, data}) => {
	const body = useRef();
	let recognition = null;//A variavel instanciada que sera usada para fazer as coisas
	let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;//A depender do navegador a definicao pode estar num ou noutro local, por isso desse ou
	if (SpeechRecognition !== undefined) {//Se for diferente de undefined Quer dizer que achou essa funcionalidade no navegador
		recognition = new SpeechRecognition();// Se a funcionalidade existe, entao ja pode ser instanciada
	}
	const [emojiOpen, setEmojiOpen] = useState(false);
	const [text, setText] = useState('');//Campo input
	const [listening, setListening] = useState(false);//Muda cor do mic
	const [list, setList] = useState([]);//Array de mensagens

	useEffect(()=>{
		if (body.current.scrollHeight > body.current.offsetHeight) {//Se a altura do conteudo e maior que a altura disponivel da div
			body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight;
		}
	},[list]);
	const handleEmojiClick = (e, emojiObject) => {
		setText(text + emojiObject.emoji);
	}
	const handleOpenEmoji = () => {
		setEmojiOpen(true);
	}

	const handleCloseEmoji = () => {
		setEmojiOpen(false);
	}

	const handleSendClick = () => {

	}

	const handleMicClick = () => {
		if (recognition !== null) {//Se diferente de null quer dizer que o navegador suporta
			recognition.onstart = () => {// O que ele vai fazer no comeco da escuta
				setListening(true);//So para mudar a cor do mic
			}

			recognition.onend = () => {//O inverso do start, obviamente
				setListening(false);
			}
			recognition.onresult = (e) => {//O que vai fazer quando tiver o resultado da escuta, e importnte referir que ele vai escutando e deduz que acabou quando vc para de falar, se ficar um silencio, ele vai parar deduzindo que vc ja falou
				setText(e.results[0][0].transcript);//2 arrays, um dentro do outro, pegamos a posicao 0 do array e a posicao 0 do array que esta dentro, esse transcript e que vai fazer a transcricao do teu audio em texto.
			}

			recognition.start();//Depois de definidas as condicoes, agora comeca a escuta, lembrar que nao precisa dizer para parar, ele para sozinho quando notar que vc parou de falar.
			//Essa funcionalidade e nativa do navegador e so funciona com internet.
		}
	}
	return (
			<div className="chatWindow">
				<div className="chatWindow--header">
					<div className="chatWindow--headerinfo">
						<img src={data.image} alt="" 
							className="chatWindow--avatar"/>
						<div className="chatWindow--name">{data.title}</div>
					</div>

					<div className="chatWindow--headerbuttons">
						<div className="chatWindow--btn">
							<SearchIcon style={{color: '#919191'}}/>
						</div>

						<div className="chatWindow--btn">
							<AttachFileIcon style={{color: '#919191'}}/>
						</div>

						<div className="chatWindow--btn">
							<MoreVertIcon style={{color: '#919191'}}/>
						</div>
					</div>
				</div>
				<div className="chatWindow--body" ref={body}>
					{list.map((item, key)=>(
							<MessageItem 
							key={key} data={item} user={user}/>
						))}
				</div>

				<div className="chatWindow--emojiarea" style={{height: emojiOpen ? '200px' : '0px'}}>
					<EmojiPicker 
						disableSearchBar 
							disableSkinTonePicker onEmojiClick={handleEmojiClick}/>
				</div>

				<div className="chatWindow--footer">
					<div className="chatWindow--pre">

						<div className="chatWindow--btn" onClick={handleCloseEmoji} 
							style={{width: emojiOpen ? '40px' : '0px'}}>
							<CloseIcon style={{color: '#919191'}}/>
						</div>

						<div className="chatWindow--btn" onClick={handleOpenEmoji}>
							<InsertEmoticonIcon style={{color: emojiOpen ? '#009688' : '#919191'}}/>
						</div>
					</div>

					<div className="chatWindow--inputarea">
						<input className="chatWindow--input" type="text" 
						placeholder="Digite uma mensagem" value={text} 
							onChange={e=>setText(e.target.value)}/>
					</div>

					<div className="chatWindow--pos">
						{text === '' &&
							<div className="chatWindow--btn" onClick={handleMicClick}>
								<MicIcon style={{color: listening ? '#126ece' : '#919191'}}/>
							</div>
						}

						{text !== '' &&
							<div className="chatWindow--btn" onClick={handleSendClick}>
								<SendIcon style={{color: '#919191'}}/>
							</div>
						}
					</div>
				</div>
			</div>
		);
}
export default Page;