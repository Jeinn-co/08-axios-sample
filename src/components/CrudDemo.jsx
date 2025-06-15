import React, { useEffect, useState } from 'react';
import { createAbortable, crud } from './lib/crud';
import { uploadFile } from './lib/upload';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CrudDemo() {
  const [file, setFile] = (useState < File) | (null > null);

  useEffect(() => {
    const { promise, abort } = createAbortable(() => crud.get('/posts/1'));
    promise.then(data => console.log('Fetched:', data));

    return () => abort(); // 自動取消請求
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    try {
      const data = await uploadFile(file);
      console.log('Upload success:', data);
    } catch (err) {
      console.error('Upload failed');
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <button onClick={() => crud.post('/posts', { title: 'Test' })}>
        Create
      </button>

      <div style={{ margin: '12px 0' }}>
        <input
          type="file"
          onChange={e => setFile(e.target.files?.[0] ?? null)}
        />
        <button onClick={handleUpload}>Upload</button>
      </div>

      <ToastContainer />
    </div>
  );
}

// import styles from './cruddemo.module.scss';

// const CrudDemo = () => {
//   const handleAdd = () => {
//     console.log('add');
//   };

//   return (
//     <div>
//       <h2>CrudDemo</h2>
//       <div
//         style={{
//           display: 'flex',
//           flexDirection: 'row',
//           columnGap: '10px',
//           width: '100vw',
//         }}
//       >
//         <div className={styles.pad}>
//           <div
//             style={{
//               display: 'flex',
//               flexDirection: 'column',
//               rowGap: '10px',
//               width: '300px',
//             }}
//           >
//             <button onClick={handleAdd}>Add</button>
//             <button>Read</button>
//             <button>Update</button>
//             <button>Delete</button>
//           </div>
//         </div>
//         <div className={styles.pad}>b</div>
//       </div>
//     </div>
//   );
// };

// export default CrudDemo;
