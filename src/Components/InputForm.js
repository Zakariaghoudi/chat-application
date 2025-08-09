
const InputForm = ({input, setInput, onSendMessage, loading})=>{
    const handleSubmit = (e) => {
        e.preventDefault();
        onSendMessage();
    };
    return(
        <form className="input-form" onSubmit={handleSubmit}>
            <input
            type='text'
            value={input}
            onChange= { (e) => setInput(e.target.value)}
            placeholder="Type your Text..."
            disabled={loading}
            />

            <button type="submit"
              disabled={loading} >
                {loading? 'Sending...' : 'Send' }

              </button>
            </form>
    );
};
export default InputForm;