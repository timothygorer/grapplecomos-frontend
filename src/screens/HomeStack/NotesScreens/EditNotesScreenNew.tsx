/* eslint-disable react/no-unstable-nested-components,react-native/no-inline-styles*/
/**
 * Rich Editor Example
 * @deprecated Please refer to example.hooks.js
 * @author wxik
 * @since 2019-06-24 14:52
 */
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Appearance,
  Button,
  ColorSchemeName,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
} from 'react-native';
import {
  actions,
  FONT_SIZE,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import {XMath} from '@wxik/core';
import {EmojiView} from './emoji';
import {INavigation, RefLinkModal} from './interface';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import ArrowLeft from '../../../assets/images/svg/javascript_svgs/ArrowLeft.js';
import ImageViewer from 'react-native-image-zoom-viewer';
import {supabase} from '../../../services/supabaseClient.js';
import {openCamera, openGallery} from '../../../services/camera/camera.js';

interface IProps {
  navigation: INavigation;
  theme?: ColorSchemeName;
}

const imageList = [
  'https://img.lesmao.vip/k/h256/R/MeiTu/1293.jpg',
  'https://pbs.twimg.com/profile_images/1242293847918391296/6uUsvfJZ.png',
  'https://img.lesmao.vip/k/h256/R/MeiTu/1297.jpg',
  'https://img.lesmao.vip/k/h256/R/MeiTu/1292.jpg',
];
const initHTML = `  <html>
    <body>
    <!-- The aspect ratio of the iframe is set to 16:9 -->
    <div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%;">
      <iframe
        src="https://www.youtube.com/embed/8Ow2VJkI7So"
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
    </div>
    </body>
    </html>`;

// const phizIcon = require('./assets/phiz.png');
// const htmlIcon = require('./assets/html.png');

function createContentStyle(dark) {
  // Can be selected for more situations (cssText or contentCSSText).
  const contentStyle = {
    backgroundColor: dark ? '#2e3847' : 'white',
    color: 'black',
    caretColor: 'red', // initial valid// initial valid
    placeholderColor: 'gray',
    // cssText: '#editor {background-color: #f3f3f3}', // initial valid
    contentCSSText: 'font-size: 16px; min-height: 200px;', // initial valid
  };
  if (!dark) {
    // contentStyle.backgroundColor = 'black';
    contentStyle.color = '#000033';
    contentStyle.placeholderColor = '#a9a9a9';
  }
  return contentStyle;
}

export function EditNotesScreenNew(props: IProps) {
  const {
    id,
    chapter_title,
    dvd_title,
    volume_title,
    chapter_number,
    richTextRef,
  } = props.route.params;
  const {dark} = useTheme();
  const {theme: initTheme = Appearance.getColorScheme(), navigation} = props;
  const richText = useRef<RichEditor>(null);
  const linkModal = useRef<RefLinkModal>();
  const scrollRef = useRef<ScrollView>(null);
  // save on html
  const contentRef = useRef(null);
  const [content, setContent] = useState(null);

  const [theme, setTheme] = useState(initTheme);
  const [emojiVisible, setEmojiVisible] = useState(false);
  const [disabled, setDisable] = useState(false);
  const contentStyle = useMemo(() => createContentStyle(dark), [dark]);
  const [modalVisible, setModalVisible] = useState(false);

  function getContentCSS(dark) {
    /*img {max-width: 98%;margin-left:auto;margin-right:auto;display: block;}*/
    console.log('dark:', dark);
    return `
    <style>
        video {max-width: 98%;margin-left:auto;margin-right:auto;display: block;}
        img {max-width: 98%;vertical-align: middle;}
        table {width: 100% !important;}
        table td {width: inherit;}
        table span { font-size: 12px !important; }
        .x-todo li {list-style:none;}
        .x-todo-box {position: relative; left: -24px;}
        .x-todo-box input{position: absolute;}
        blockquote{border-left: 6px solid #ddd;padding: 5px 0 5px 10px;margin: 15px 0 15px 15px;}
        hr{display: block;height: 0; border: 0;border-top: 1px solid #ccc; margin: 15px 0; padding: 0;}
        pre{padding: 10px 5px 10px 10px;margin: 15px 0;display: block;line-height: 18px;background: #A34D4D;border-radius: 6px;font-size: 13px; font-family: 'monaco', 'Consolas', "Liberation Mono", Courier, monospace; word-break: break-all; word-wrap: break-word;overflow-x: auto;}
        pre code {display: block;font-size: inherit;white-space: pre-wrap;color: inherit;}
         p {
        color: ${dark ? 'white' : 'black'};
    }
        body {
        background-color: ${dark ? 'black' : 'white'};
        color: ${dark ? 'white' : 'black'}; /* General text color */
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }

     h1, h2, h3, h4, h5, h6,li, p {
        color: ${dark ? 'white' : 'black'};
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }
    
    #trigger:hover {
    background-color: 'blue';
}

    </style>
    `;
  }

  // on save to preview
  const handleSave = useCallback(async () => {
    console.log('hi.');
    const {data, error} = await supabase.from('chapter').upsert({
      id,
      name: chapter_title,
      dvd_title,
      volume_title,
      chapter_number,
      raw_notes: contentRef.current,
    });
    console.log(data, error);
    // navigation.push('NotesScreen', {
    //   html: contentRef.current,
    //   css: getContentCSS(dark),
    //   richTextRef: richText,
    // });
    richTextRef.current?.setContentHTML(contentRef.current);
    navigation.goBack();
  }, [navigation, dark]);

  const handleHome = useCallback(() => {
    navigation.push('index');
  }, [navigation]);

  // editor change data
  const handleChange = useCallback((html: string) => {
    // save html to content ref;
    contentRef.current = html;
  }, []);

  // theme change to editor color
  const themeChange = useCallback(
    ({colorScheme}: Appearance.AppearancePreferences) => {
      setTheme(colorScheme);
    },
    [],
  );

  const onTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme]);

  const onDisabled = useCallback(() => {
    setDisable(!disabled);
  }, [disabled]);

  const editorInitializedCallback = useCallback(() => {
    // richText.current.registerToolbar(function (items) {
    // console.log('Toolbar click, selected items (insert end callback):', items);
    // });
  }, []);

  const onKeyHide = useCallback(() => {}, []);

  const onKeyShow = useCallback(() => {
    TextInput.State.currentlyFocusedInput() && setEmojiVisible(false);
  }, []);

  // editor height change
  const handleHeightChange = useCallback((height: number) => {
    console.log('editor height change:', height);
  }, []);

  const handleInsertEmoji = useCallback((emoji: string) => {
    richText.current?.insertText(emoji);
    richText.current?.blurContentEditor();
  }, []);

  const handleEmoji = useCallback(() => {
    Keyboard.dismiss();
    richText.current?.blurContentEditor();
    setEmojiVisible(!emojiVisible);
  }, [emojiVisible]);

  const handleInsertVideo = useCallback(() => {
    richText.current?.insertVideo(
      'https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4',
      'width: 50%;',
    );
  }, []);

  const handleInsertHTML = useCallback(() => {
    // this.richText.current?.insertHTML(
    //     `<span onclick="alert(2)" style="color: blue; padding:0 10px;" contenteditable="false">HTML</span>`,
    // );
    richText.current?.insertHTML(
      `<div style="padding:10px 0;" contentEditable="false">
                <iframe  width="100%" height="220"  src="https://www.youtube.com/embed/6FrNXgXlCGA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>`,
    );
  }, []);

  const onPressAddImage = useCallback(async () => {
    // insert URL
    // richText.current?.insertImage(
    //   'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png',
    //   'background: gray;',
    // );
    // insert base64
    // this.richText.current?.insertImage(`data:${image.mime};base64,${image.data}`);
    const image = await openGallery('', '', null);
    richText.current?.insertImage(`data:${image.mime};base64,${image.data}`);
    const {data, error} = await supabase
      .from('notes')
      .upsert({raw_notes: contentRef.current});
    console.log(data, error);
  }, []);

  const onInsertLink = useCallback(() => {
    // this.richText.current?.insertLink('Google', 'http://google.com');
    linkModal.current?.setModalVisible(true);
  }, []);

  const onLinkDone = useCallback(
    ({title, url}: {title?: string; url?: string}) => {
      if (title && url) {
        richText.current?.insertLink(title, url);
      }
    },
    [],
  );

  const handleFontSize = useCallback(() => {
    // 1=  10px, 2 = 13px, 3 = 16px, 4 = 18px, 5 = 24px, 6 = 32px, 7 = 48px;
    let size = [1, 2, 3, 4, 5, 6, 7];
    richText.current?.setFontSize(
      size[XMath.random(size.length - 1)] as FONT_SIZE,
    );
  }, []);

  const handleForeColor = useCallback(() => {
    richText.current?.setForeColor('blue');
  }, []);

  const handleHaliteColor = useCallback(() => {
    richText.current?.setHiliteColor('red');
  }, []);

  const handlePaste = useCallback((data: any) => {
    console.log('Paste:', data);
  }, []);

  // @deprecated Android keyCode 229
  const handleKeyUp = useCallback(() => {
    // console.log('KeyUp:', data);
  }, []);

  // @deprecated Android keyCode 229
  const handleKeyDown = useCallback(() => {
    // console.log('KeyDown:', data);
  }, []);

  const handleInput = useCallback(() => {
    // console.log(inputType, data)
  }, []);

  const handleMessage = useCallback(
    ({type, id, data}: {type: string; id: string; data?: any}) => {
      switch (type) {
        case 'ImgClick':
          setModalVisible(!modalVisible);
          console.log('click.');
          // richText.current?.commandDOM(
          //   `$('#${id}').src="${
          //     imageList[XMath.random(imageList.length - 1)]
          //   }"`,
          // );
          break;
        case 'TitleClick':
          const color = ['red', 'blue', 'gray', 'yellow', 'coral'];

          // command: $ = document.querySelector
          richText.current?.commandDOM(
            `$('#${id}').style.color='${
              color[XMath.random(color.length - 1)]
            }'`,
          );
          break;
        case 'SwitchImage':
          break;
      }
      console.log('onMessage', type, id, data);
    },
    [],
  );

  const handleFocus = useCallback(() => {
    console.log('editor focus');
  }, []);

  const handleBlur = useCallback(() => {
    console.log('editor blur');
  }, []);

  const handleCursorPosition = useCallback((scrollY: number) => {
    // Positioning scroll bar
    scrollRef.current!.scrollTo({y: scrollY - 30, animated: true});
  }, []);

  useEffect(() => {
    let listener = [
      Appearance.addChangeListener(themeChange),
      Keyboard.addListener('keyboardDidShow', onKeyShow),
      Keyboard.addListener('keyboardDidHide', onKeyHide),
    ];
    return () => {
      listener.forEach(it => it.remove());
    };
  }, [onKeyHide, onKeyShow, themeChange]);

  const stylesPressChangeHandler = useCallback(
    ({pressed}) => pressed && styles.pressed,
    [],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={styles.headerLeftContainer}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={stylesPressChangeHandler}>
            <ArrowLeft size={24} color={dark ? 'white' : 'black'} />
          </Pressable>
        </View>
      ),
      headerRight: () => (
        <View style={{marginRight: 16}}>
          <Pressable
            onPress={async () => {
              await handleSave();
            }}
            style={stylesPressChangeHandler}>
            <Text style={{color: 'black'}}>Save</Text>
          </Pressable>
        </View>
      ),
      headerStyle: {
        backgroundColor: dark ? '#000' : 'rgba(255, 255, 255, 1)',
        shadowColor: 'transparent',
        elevation: 0,
      },
      headerTitleAlign: 'center',
    });
  }, [dark, navigation]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const {data, error} = await supabase
          .from('chapter')
          .select('*')
          .eq('dvd_title', dvd_tite)
          .eq('name', chapter_title);
        console.log('raw_notes: ', data, error);
        setContent(data[0]?.raw_notes);
        contentRef.current = data[0]?.raw_notes;
      })();
    }, []),
  );

  const {backgroundColor, color, placeholderColor} = contentStyle;

  return (
    <SafeAreaView style={[styles.container, dark && styles.darkBack]}>
      <StatusBar barStyle={!dark ? 'dark-content' : 'light-content'} />
      <Modal visible={modalVisible} transparent={true} style={{height: 300}}>
        <View style={{height: 100, backgroundColor: 'red', width: 20}} />
        <ImageViewer
          imageUrls={[{url: 'https://dummyimage.com/40x40/fff/aaa', props: {}}]}
        />
      </Modal>
      <ScrollView
        style={[styles.scroll, dark && styles.scrollDark]}
        keyboardDismissMode={'none'}
        ref={scrollRef}
        nestedScrollEnabled={true}
        scrollEventThrottle={20}>
        <RichToolbar
          style={[styles.richBar, dark && styles.richBarDark]}
          flatContainerStyle={styles.flatStyle}
          editor={richText}
          disabled={disabled}
          selectedIconTint={'#2095F2'}
          disabledIconTint={'#bfbfbf'}
          onPressAddImage={onPressAddImage}
          onInsertLink={onInsertLink}
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.insertBulletsList,
            actions.indent,
            actions.outdent,
            actions.removeFormat,
          ]}
        />
        <RichEditor
          // initialFocus={true}
          initialFocus={false}
          firstFocusEnd={false}
          disabled={false}
          editorStyle={contentStyle} // default light style
          ref={richText}
          style={styles.rich}
          useContainer={true}
          initialHeight={400}
          enterKeyHint={'done'}
          // containerStyle={{borderRadius: 24}}
          placeholder={'please input content'}
          initialContentHTML={initHTML}
          editorInitializedCallback={editorInitializedCallback}
          onChange={handleChange}
          onHeightChange={handleHeightChange}
          onPaste={handlePaste}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          onMessage={handleMessage}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onCursorPosition={handleCursorPosition}
          pasteAsPlainText={true}
        />
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <RichToolbar
          style={[styles.richBar, dark && styles.richBarDark]}
          flatContainerStyle={styles.flatStyle}
          editor={richText}
          disabled={disabled}
          // iconTint={color}
          selectedIconTint={'#2095F2'}
          disabledIconTint={'#bfbfbf'}
          onPressAddImage={onPressAddImage}
          onInsertLink={onInsertLink}
          // iconSize={24}
          // iconGap={10}
          actions={[
            actions.undo,
            actions.redo,
            actions.insertVideo,
            actions.insertImage,
            actions.setStrikethrough,
            // actions.checkboxList,
            actions.insertOrderedList,
            actions.blockquote,
            actions.alignLeft,
            actions.alignCenter,
            actions.alignRight,
            actions.code,
            actions.line,

            actions.foreColor,
            actions.hiliteColor,
            actions.heading1,
            actions.heading4,
            'insertEmoji',
            'insertHTML',
            'fontSize',
          ]} // default defaultActions
          iconMap={{
            insertEmoji: null,
            [actions.foreColor]: () => (
              <Text style={[styles.tib, {color: 'blue'}]}>FC</Text>
            ),
            [actions.hiliteColor]: ({tintColor}) => (
              <Text
                style={[
                  styles.tib,
                  {color: tintColor, backgroundColor: 'red'},
                ]}>
                BC
              </Text>
            ),
            [actions.heading1]: ({tintColor}) => (
              <Text style={[styles.tib, {color: tintColor}]}>H1</Text>
            ),
            [actions.heading4]: ({tintColor}) => (
              <Text style={[styles.tib, {color: tintColor}]}>H4</Text>
            ),
            insertHTML: null,
          }}
          insertEmoji={handleEmoji}
          insertHTML={handleInsertHTML}
          insertVideo={handleInsertVideo}
          fontSize={handleFontSize}
          foreColor={handleForeColor}
          hiliteColor={handleHaliteColor}
        />
        {emojiVisible && <EmojiView onSelect={handleInsertEmoji} />}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  rich: {
    minHeight: 300,
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e3e3e3',
  },
  topVi: {
    backgroundColor: '#fafafa',
  },
  richBar: {
    borderColor: '#efefef',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  richBarDark: {
    backgroundColor: '#191d20',
    borderColor: '#696969',
  },
  scroll: {
    backgroundColor: '#ffffff',
  },
  scrollDark: {
    backgroundColor: '#2e3847',
  },
  darkBack: {
    backgroundColor: '#191d20',
  },
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e8e8e8',
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  input: {
    flex: 1,
  },

  tib: {
    textAlign: 'center',
    color: '#515156',
  },

  flatStyle: {
    paddingHorizontal: 12,
  },
});
