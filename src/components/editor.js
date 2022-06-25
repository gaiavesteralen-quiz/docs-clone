import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';


Quill.register('modules/imageResize', ImageResize);

/*
 * Simple editor component that takes placeholder text as a prop
 */

const Editor = (props) => {

    return (<>
      <ReactQuill
        theme={props.theme}
        onChange={props.onchanges}
        value={props.values}
        modules={Editor.modules}
        formats={Editor.formats}
        bounds={'#root'}
        placeholder={props.placeholder}
      />
   </>);
}


/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ size: [] }],
    [{ 'font': [] }], 
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    [{ 'align': [] }],  
    [{ 'direction': 'rtl' }],  
    ['link', 'image', 'video'],
    ['clean']
    [{ 'color': [] }]  
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  },
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize']
  }
};

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video'
];

export default Editor;