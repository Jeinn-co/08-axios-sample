import React, { useEffect, useState } from 'react';
import { createAbortable, crud } from '../lib/crud';
import { uploadFile } from '../lib/upload';
import { ToastContainer, toast } from 'react-toastify';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import 'react-toastify/dist/ReactToastify.css';

export default function CrudDemo() {
  const [file, setFile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const abortFetchPosts = fetchPosts();
    const abortFetchUploads = fetchUploads();
    return () => {
      abortFetchPosts();
      abortFetchUploads();
    };
  }, []);

  const fetchPosts = () => {
    const { promise, abort } = createAbortable(signal =>
      crud.get('/posts', signal)
    );
    promise.then(setPosts).catch(() => {});
    return abort;
  };

  const fetchUploads = () => {
    const { promise, abort } = createAbortable(signal =>
      crud.get('/uploads', signal)
    );
    promise.then(setUploads).catch(() => {});
    return abort;
  };

  const handleCreate = async () => {
    try {
      const newPost = {
        title: '新文章',
        body: '請輸入文章內容',
        createdAt: new Date().toISOString(),
      };
      await crud.post('/posts', newPost);
      toast.success('新增文章成功');
      fetchPosts();
    } catch (err) {
      console.error('Create failed:', err);
      toast.error('新增文章失敗');
    }
  };

  const handleUpdate = async id => {
    try {
      const updatedPost = {
        title: editTitle,
        body: editBody,
        updatedAt: new Date().toISOString(),
      };
      await crud.put(`/posts/${id}`, updatedPost);
      setEditingPost(null);
      setEditTitle('');
      setEditBody('');
      toast.success('更新文章成功');
      fetchPosts();
    } catch (err) {
      console.error('Update failed:', err);
      toast.error('更新文章失敗');
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('確定要刪除這篇文章嗎？')) return;
    try {
      await crud.del(`/posts/${id}`);
      toast.success('刪除文章成功');
      fetchPosts();
    } catch (err) {
      console.error('Delete failed:', err);
      toast.error('刪除文章失敗');
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    try {
      setIsUploading(true);
      const result = await uploadFile(file);
      setUploads(prev => [...prev, result]);
      toast.success('上傳成功');
      setFile(null);
    } catch (err) {
      console.error('Upload failed:', err);
      toast.error('上傳失敗');
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageClick = index => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  const getImageFiles = () =>
    uploads.filter(upload => upload.type.startsWith('image/'));

  const slides = getImageFiles().map(upload => ({
    src: upload.url,
    alt: upload.name,
  }));

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 20 }}>
        <button onClick={handleCreate}>新增文章</button>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h3>文章列表</h3>
        {posts.map(post => (
          <div
            key={post.id}
            style={{ marginBottom: 10, padding: 10, border: '1px solid #ccc' }}
          >
            {editingPost === post.id ? (
              <div>
                <div style={{ marginBottom: 10 }}>
                  <input
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    placeholder="標題"
                    style={{ width: '100%', marginBottom: 5 }}
                  />
                  <textarea
                    value={editBody}
                    onChange={e => setEditBody(e.target.value)}
                    placeholder="內容"
                    style={{ width: '100%', height: 100 }}
                  />
                </div>
                <button onClick={() => handleUpdate(post.id)}>儲存</button>
                <button onClick={() => setEditingPost(null)}>取消</button>
              </div>
            ) : (
              <div>
                <h4>{post.title}</h4>
                <p>{post.body}</p>
                <small>
                  建立時間: {new Date(post.createdAt).toLocaleString()}
                </small>
                {post.updatedAt && (
                  <small style={{ marginLeft: 10 }}>
                    更新時間: {new Date(post.updatedAt).toLocaleString()}
                  </small>
                )}
                <div style={{ marginTop: 10 }}>
                  <button
                    onClick={() => {
                      setEditingPost(post.id);
                      setEditTitle(post.title);
                      setEditBody(post.body);
                    }}
                  >
                    編輯
                  </button>
                  <button onClick={() => handleDelete(post.id)}>刪除</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ margin: '12px 0' }}>
        <h3>檔案上傳</h3>
        <div style={{ marginBottom: 10 }}>
          <input
            type="file"
            onChange={e => setFile(e.target.files?.[0] ?? null)}
            accept="image/*"
          />
          <button onClick={handleUpload} disabled={!file || isUploading}>
            {isUploading ? '上傳中...' : '上傳'}
          </button>
        </div>

        <div>
          <h4>已上傳的圖片</h4>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '16px',
              marginTop: '16px',
            }}
          >
            {getImageFiles().map((upload, index) => (
              <div
                key={upload.id}
                style={{
                  cursor: 'pointer',
                  border: '1px solid #eee',
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={upload.url}
                  alt={upload.name}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <div style={{ padding: '8px' }}>
                  <div
                    style={{
                      fontSize: '14px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {upload.name}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#666',
                      marginTop: '4px',
                    }}
                  >
                    {new Date(upload.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={selectedImageIndex}
      />

      <ToastContainer />
    </div>
  );
}
