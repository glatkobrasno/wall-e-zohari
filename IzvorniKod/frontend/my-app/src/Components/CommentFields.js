//node modules imports
import React from "react";
import Axios from 'axios';
import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
//css imports
import '../styles/CommentFields.css';


import conf_back_url from "../configuration.js" 
const backURL=conf_back_url;//backend URL





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
                <textarea id="commentFieldIn" name='commentFieldIn' placeholder='Upišite komentar ...' {...komentarIn} required></textarea>
                <input id="likeState1" type="radio" name="liked" value={1} checked={liked === 1} onClick={()=>handleRadioClick(1)} onChange={()=>{}}></input>
                <label htmlFor="likeState1" className="Llike_label">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="like_dislike_svgL" viewBox="0 0 16 16">
                        <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                    </svg>
                </label>
                <input id="likeState2" type="radio" name="liked" value={-1} checked={liked === -1} onClick={()=>handleRadioClick(-1)} onChange={()=>{}}></input>
                <label htmlFor="likeState2" className="Dlike_label">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="like_dislike_svgD" viewBox="0 0 16 16">
                        <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.38 1.38 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51q.205.03.443.051c.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.9 1.9 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2 2 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.2 3.2 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.8 4.8 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591"/>
                    </svg>
                </label>
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
    console.log(type, id, idComment, replyMsg[idComment]);
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
                if(comments[i][3]===null) continue;
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
                generated.push(<hr key={"hr"+i}></hr>)
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
