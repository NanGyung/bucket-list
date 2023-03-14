import React, { useCallback, useState, useEffect } from 'react';
import { StatusBar, Dimensions, Alert, Pressable, Text, StyleSheet} from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import Input from './components/Input';
import Task from './components/Task';
import DeleteTask from './components/DeleteTask';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from 'expo-splash-screen';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  justify-content: center;  
`;

const Title = styled.Text`
  width: ${({ width }) => width - 40}px;
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.titleText};
  align-self: flex-start;
  text-align: center;
  margin: 24px 20px;
  padding: 10px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.titleBackground};
  `;

const List = styled.ScrollView`
  flex: 1;
  width: ${({ width }) => width - 40}px;
`;

SplashScreen.preventAutoHideAsync();

function App() {
  const width = Dimensions.get('window').width;
  const [isReady, setIsReady] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState({});


  const _saveTasks = async tasks => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      setTasks(tasks);
    } catch (e) {
      console.error(e);
    }
  };

  const _loadTasks = async () => {
    try {
      const loadedTasks = await AsyncStorage.getItem('tasks');
      setTasks(JSON.parse(loadedTasks) || {});
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    async function prepare() {
      try {
        await _loadTasks();
      } catch (e) {
        console.error(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }


  const _addTask = () => {
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]: { id: ID, text: newTask, completed: false }
    };
    setNewTask('');
    _saveTasks({ ...tasks, ...newTaskObject });
  };

  const _deleteTask = id => {
    const currentTasks = { ...tasks };
    Alert.alert('', '삭제하시겠습니까?', [
      {
        text: '아니오',
        onPress() {
        },
      }, {
        text: '예',
        onPress() {
          delete currentTasks[id];
          _saveTasks(currentTasks);
        },
      }
    ])
  };

  const _deleteAll = id => {
    const currentTasks = { ...tasks };
    if (currentTasks[id]['completed'] == 'true') {
      delete currentTasks[id];
      _saveTasks(currentTasks);
    }
  };

  const _toggleTask = id => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id]['completed'] = !currentTasks[id]['completed'];
    _saveTasks(currentTasks);
  };

  const _updateTask = item => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[item.id] = item;
    _saveTasks(currentTasks);
  };

  const _handleTextChange = text => {
    setNewTask(text);
  };

  const _onBlur = () => {
    setNewTask('');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container onLayout={onLayoutRootView}>
        <StatusBar
          barStyle="light-content"
          backgroundcolor={theme.background}
        />
        <Title width={width}>버킷리스트</Title>
        <Input
          placeholder="+ 항목 추가"
          value={newTask}
          onChangeText={_handleTextChange}
          onSubmitEditing={_addTask}
          onBlur={_onBlur}
        />
        <List width={width}>
          {Object.values(tasks)
            .reverse()
            .map(item => (
              <Task
                key={item.id}
                item={item}
                deleteTask={_deleteTask}
                toggleTask={_toggleTask}
                updateTask={_updateTask}
              />))
          }
        </List>
        {/* {Object.values(tasks).map(item => (
          <DeleteTask
            key={item.id}
            item = {item}
            deleteTask = {_deleteAll}  
          />
        ))} */}
          <Pressable 
            style={styles.pressable} 
            onPressOut={() => _deleteAll(tasks.id)}
          >
            <Text style={styles.text}>
              완료항목 전체삭제
            </Text>
          </Pressable>

      </Container>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    backgroundColor: '#308ABD',
    width: '80%',
    height: 50,
    margin: 20,
    elevation: 5,
  },
  text: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold'
  }
});

export default App;

