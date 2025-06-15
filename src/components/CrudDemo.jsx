import styles from './cruddemo.module.scss';

const CrudDemo = () => {
  const handleAdd = () => {
    console.log('add');
  };

  return (
    <div>
      <h2>CrudDemo</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          columnGap: '10px',
          width: '100vw',
        }}
      >
        <div className={styles.pad}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '10px',
              width: '300px',
            }}
          >
            <button onClick={handleAdd}>Add</button>
            <button>Read</button>
            <button>Update</button>
            <button>Delete</button>
          </div>
        </div>
        <div className={styles.pad}>b</div>
      </div>
    </div>
  );
};

export default CrudDemo;
