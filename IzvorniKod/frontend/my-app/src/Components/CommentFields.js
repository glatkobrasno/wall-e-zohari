//node modules imports
import React from "react";
import Axios from 'axios';
import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
//css imports
import '../styles/CommentFields.css';


const backURL='http://127.0.0.1:8000';//backend URL





function useFormField(initialValue) { //updates variables values when they change in form
    const [value, setValue] = React.useState(initialValue);
    const handleChange = (newValue) => setValue(newValue.target.value);
    return { value, onChange: handleChange };
}





function PostCommentUi(id, type, userData, setCommentsData){ // needs: type(kuharica/recept),  idkuharica / idrecept, korisnickoIme, 
    const komentarIn = useFormField('');
    const [liked, setLiked] = useState(null);
    let username = null;
    if(userData === null){
        username=null;
    }
    else{
        username = userData.username;
    }

    function handleRadioClick(value){// handles radio buttons
        if (liked === value) {
        setLiked(null);
        } else {
        setLiked(value);
        }
    }

    async function handleCommentPost(e){
        e.preventDefault();
        //(id,type,uname,commtent,ocjena)
       let data ={
            'id':id,
            'type':type,
            'uname':username,
            'comment':komentarIn.value,
            'ocjena' : liked
        };
        try{
        await Axios.post(backURL+'/add_comments/', data);
        //alert("Hvala na komentaru :)");

        const updatedCommentsData = await requestCommentData(type, id);
        setCommentsData(updatedCommentsData);
        }
        catch(error){
            console.log(error)
            alert("Problem u pohrani komentara :(");
        }
    }


    return(
        <div className="comment_post_box">
            <form className="comment_post_form" onSubmit={handleCommentPost}>
                <textarea id="commentFieldIn" name='commentFieldIn' placeholder='Upišite komentar ...' {...komentarIn} required ></textarea>
                <input id="likeState1" type="radio" name="liked" value={1} checked={liked === 1} onClick={()=>handleRadioClick(1)} onChange={()=>{}}></input>
                <input id="likeState2" type="radio" name="liked" value={-1} checked={liked === -1} onClick={()=>handleRadioClick(-1)} onChange={()=>{}}></input>
                <input type='submit' name='postButton' id='postButton' value='Post'></input>
            </form>
        </div>
    );
}





function ReplyBox(id, type, name, content, commentID){
    return(
        <div className="reply_box" key={"reply"+commentID}>
            <div className="replyors_data" key={"replyU"+commentID}>{name}</div>
            <div className="replyors_comment" key={"replyC"+commentID}>{content}</div>
        </div>
    );
}

function ReplyArea(id, type, commentID, replyMsgs, setReplyMsgs, setCommentsData){ 
    var txAreaId = "commentReply"+commentID;
    var subButtonId = "commentReply"+commentID;
    return(
        <div className="reply_to_user" key={"replyAr"+commentID}>
            <form className="comment_reply_form" onSubmit={(e)=>postReplyToComment(e, type, id, commentID, replyMsgs, setCommentsData)} key={"replyArF"+commentID}>
                <textarea id={txAreaId} name={txAreaId} placeholder="Upišite odgovor ..." key={"replyArT"+commentID} 
                    onChange={(e)=>{setReplyMsgs((prev) => ({ ...prev, [commentID]: e.target.value }))}} required>
                </textarea>
                <input type="submit" id={subButtonId} className="post_rep_btn" value="Post" key={"replyArI"+commentID}></input>
            </form>
        </div>
    );
}

function CommentBox(id, type, isLiked, uname, content, commentID){

    if(isLiked === 1){
        return(
            <div className="comment_box" id="comment_likes" key={"comment"+commentID}>
                <div className="commentors_data" key={"commentU"+commentID}>{uname}</div>
                <div className="commentors_comment" key={"commentC"+commentID}>{content}</div>
            </div>
        );
    }
    else
    if(isLiked === -1){
        return(
            <div className="comment_box" id="comment_dislikes" key={"comment"+commentID}>
                <div className="commentors_data" key={"commentU"+commentID}>{uname}</div>
                <div className="commentors_comment" key={"commentC"+commentID}>{content}</div>
            </div>
        );
    }
    else{
        return(
            <div className="comment_box" key={"comment"+commentID}>
                <div className="commentors_data" key={"commentU"+commentID}>{uname}</div>
                <div className="commentors_comment" key={"commentC"+commentID}>{content}</div>
            </div>
        );
    }
}

async function postReplyToComment(e, type, id, idComment, replyMsg, setCommentsData){
    e.preventDefault();
    var data = {// podatci za bazu
        'type' : type,
        'idcom' : idComment,
        'content' : replyMsg[idComment]
    };
    try{
        await Axios.post(backURL+'/add_reply/', data);// dodaj reply u bazu
        const updatedCommentsData = await requestCommentData(type, id);// ponovo dohvati komentare
        setCommentsData(updatedCommentsData);// sluzi za re render komentara
    }
    catch(error){
        console.log(error);
    }
}

async function requestCommentData(type, idSubject){ // type('kuharica','recept'), idkuharica/recept
    try{
        //logic for geting comments
        var response = await Axios.post(backURL+'/get_comments/', {'type':type, 'idsub':idSubject});// response -> comments, entuzijast
        // if response.notempty===true, save respnse data in variable
        //console.log(response.data);
        return response.data;
    }
    catch(Error){
        console.log(Error);
    }
    
}


function CommentFields(){ // id kuharice/recepta, type 'recept'/ 'kuharica'
    const [commentsData, setCommentsData] = useState(null); 
    const {type, id} = useParams();
    const [replyMsgs, setReplyMsgs] = useState({});


    const [isKulinar, setIsKulinar] = useState(null);
    const [userData, setuserData] = useState(null);
    useEffect(() => {
        const userDataFromSession = JSON.parse(sessionStorage.getItem('userData'));
    
        if (userDataFromSession) {
          setuserData(userDataFromSession);
          setIsKulinar(userDataFromSession.lvl === 3);
        } else {
          setIsKulinar(false);
        }
    }, []);
     // console.log(userData);

    useEffect(() =>{ // Gets new  data when type ore id change
        const fetch = async () => {
            try {
            const data = await requestCommentData(type, id);
            setCommentsData(data);
            } catch (error) {
            console.error('Error fetching comments data:', error);
            }
        }
        fetch();
    },[type, id]);
    


    function GenerateComments(id, type){ // TODO ne radi
        var generated=[];
            if(commentsData !== null){
                var comments= commentsData.comments; // comments[i][IDcom,KorIme,ocjena,sadrzaj,odgovor]
                var entuzijast= commentsData.entuzijast;
                var commentorName = null;
                for(var i = 0; i < comments.length; ++i){
                    if(comments[i][1]===null) commentorName = "anoniman korisnik";
                    else commentorName = comments[i][1];
                    generated.push(CommentBox(id, type, comments[i][2], commentorName, comments[i][3], comments[i][0]));
                    if(comments[i][4]!=null){
                        generated.push(ReplyBox(id,type,entuzijast,comments[i][4], comments[i][0]));
                    }
                    else if(isKulinar){
                        if(userData !== null)
                            if(userData.username === entuzijast)
                                generated.push(ReplyArea(id, type, comments[i][0], replyMsgs, setReplyMsgs, setCommentsData));

                    }
                }
                return(generated)
                
            }
            else{
                return(null);
            }
    }


    return(
    <div className="comments_box">
        {PostCommentUi(id, type, userData, setCommentsData)}
        <div className="comment_reply_box">
        {GenerateComments(id,type)} 
        {/* {CommentBox(id,type,0,"user","bla bla")}
        {CommentBox(id,type,-1,"user","bla bla")}
        {ReplyBox(id,type,"user","bla bla")}
        {ReplyArea(id, type, 1)} */}
        </div>
    </div>
    );
}
export default CommentFields;