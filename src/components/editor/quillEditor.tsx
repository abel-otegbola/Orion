import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface content {
    text: string,
    setText: (html: string) => void
}

const TextEditor = ({ text, setText }: content) => {
    const modules = {
        toolbar: [
          [{ 'header': '1'}],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, 
           {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image', 'video'],
          ['clean']
        ],
        clipboard: {
          // toggle to add extra line breaks when pasting HTML:
          matchVisual: false,
        }
      }
      
    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
      ]
      

    return (
        <ReactQuill
            theme={"snow"}
            value={text}
            modules={modules}
            formats={formats}
            placeholder={"Start typing"}
            className="w-full"
            onChange={(html: string) => setText(html)}
        />
    )
}

export default TextEditor;