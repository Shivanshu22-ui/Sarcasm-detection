import './Header.css'

function Header(props) {
  return (
    <div className="Header">
      <p><span className='bold'>{props.sarcasmNumber} </span>out of <span className='bold'>{props.totalNumber}</span> sentences are sarcastic text based Tweets</p>
    </div>
  );
}

export default Header;