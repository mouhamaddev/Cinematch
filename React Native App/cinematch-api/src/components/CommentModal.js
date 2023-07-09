import React, { useState } from 'react';
import {
    TextInput,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Modal,
  } from 'react-native';

  const Comment = ({ username, text }) => (
    <View style={styles.comment}>
      <Text style={styles.username}>{username}</Text>
      <Text>{text}</Text>
    </View>
  );
  
  const CommentSection = ({ isLoggedIn, signIn, existingComments}) => {
    const [comments, setComments] = useState(existingComments || []);
    const [text, setText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
  
    const handleSubmit = () => {
      if (!isLoggedIn) {
        setModalVisible(true);
      } else if (text) {
        setComments([...comments, { username: 'Current User', text }]);
        setText('');
      }
    };
  
    const handleModalClose = () => {
      setModalVisible(false);
    };
  
    return (
      <View style={styles.commentSection}>
        <Text style={styles.header}>Comment Section</Text>
        {comments.map((comment, index) => (
          <Comment key={index} username={comment.username} text={comment.text} />
        ))}
        <View style={styles.commentForm}>
          <TextInput
            style={styles.textarea}
            multiline
            placeholder="Write your comment here..."
            value={text}
            onChangeText={(text) => setText(text)}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Post Comment</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleModalClose}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>You must be signed in to comment.</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={signIn} style={[styles.modalButton, styles.yesButton]}>
                  <Text style={styles.modalButtonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleModalClose} style={[styles.modalButton, styles.noButton]}>
                  <Text style={styles.modalButtonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  
  export default function CommentModal({page, existComments}) {
    const signIn = () => {
      //backend functionality
    };
    //depends on where the movie page is called from
    const isLoggedIn = page==="guest"? false: true;
  
    return (
      <View style={styles.container}>
        <ScrollView>
          <CommentSection isLoggedIn={isLoggedIn} signIn={signIn} existingComments={existComments}/>
        </ScrollView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    },
    commentSection: {
      paddingHorizontal: 5,
      backgroundColor: 'black'
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white'
    },
    comment: {
      flexDirection: 'row',
      marginTop: 10,
      color: 'white'
    },
    username: {
      fontWeight: 'bold',
    },
    commentForm: {
      marginTop: 10,
      color: 'white'
    },
    textarea: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 5
  },
  submitButtonText:{
    color: 'black',
    backgroundColor: 'white',
    width: '40%',
    borderRadius: 30, 
    marginLeft: '30%',
    marginTop: 10,
    padding: 5, 
    textAlign:'center'
  }
})