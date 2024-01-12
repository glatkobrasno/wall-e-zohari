//node modules imports
import React from "react";
//css imports
import '../styles/ComentFields.css';





// const userData = JSON.parse(sessionStorage.getItem('userData'));
// const isKulinar = userData.lvl === 3
const isKulinar = true


function useFormField(initialValue) { //updates variables values when they change in form
    const [value, setValue] = React.useState(initialValue);
    const handleChange = (newValue) => setValue(newValue.target.value);
    return { value, onChange: handleChange };
}




function PostComentUi(id, type){ // needs: type(kuharica/recept),  idkuharica / idrecept, korisnickoIme, 
    const komentarIn = useFormField('');

    function handleComentPost(e){
        e.preventDefault();

    
    }

    return(
        <div className="coment_post_box">
            <form className="coment_post_form" onSubmit={handleComentPost}>
                <textarea id="comentFieldIn" name='comentFieldIn' placeholder='Upišite komentar ...' {...komentarIn} required ></textarea>
                <input id="likeState1" type="radio" name="liked" value={true} required></input>
                <input id="likeState2" type="radio" name="liked" value={false} required></input>
                <input type='submit' name='postButton' id='postButton'></input>
            </form>
        </div>
    );
}





function ReplyBox(id, type){
    return(
        <div className="reply_box">
            <div className="replyors_data">User Name</div>
            <div className="replyors_coment">bla bla</div>
        </div>
    );
}

function ReplyArea(id, type, comentID){ 
    var txAreaId = "comentReply"+comentID;
    var subButtonId = "comentReply"+comentID;
    return(
        <div className="reply_to_user">
            <form className="coment_reply_form" onSubmit={postReplyToComent(type, comentID,/*textarea data*/)}>
                <textarea id={txAreaId} name={txAreaId} placeholder="Upišite odgovor ..."></textarea>
                <input type="submit" id={subButtonId} className="post_rep_btn" value="Post"></input>
            </form>
        </div>
    );
}

function ComentBox(id, type, isLiked){

    if(isLiked === true){
        return(
            <div className="coment_box" id="coment_likes">
                <div className="comentors_data" >User Name</div>
                <div className="comentors_coment">bla bla</div>
            </div>
        );
    }
    else{
        return(
            <div className="coment_box" id="coment_dislikes">
                <div className="comentors_data" >User Name</div>
                <div className="comentors_coment">bla bla</div>
            </div>
        );
    }
}

function postReplyToComent(type, idComent, replyMsg){ // type, idkomentara, odgovor
    //logic for sending data to backend
}

function requestComentData(type, idSubject){ // type('kuharica','recept'), idkuharica/recept
    //logic for geting coments
}


function ComentFields(id, type){ // id kuharice/recepta, type 'recept'/ 'kuharica'
    return(
    <div className="coments_box">
        {PostComentUi(id, type)}
        <div className="coment_reply_box">
            {ComentBox(id, type, true)}
            {ReplyBox(id, type)}
            {isKulinar && ReplyArea(id,type,1)}
        </div>
    </div>
    );
}
export default ComentFields;