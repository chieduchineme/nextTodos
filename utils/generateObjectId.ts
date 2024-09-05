// utils/generateObjectId.ts
export function generateObjectId() {
    const timestamp = (Math.floor(new Date().getTime() / 1000)).toString(16);
    const objectId = timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => {
      return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
    
    return objectId;
  }
  