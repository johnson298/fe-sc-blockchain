import ipfs from 'ipfs-core';
// const { create: storeIpfs } = require('ipfs-http-client');

// const ipfs = storeIpfs({host: '18.138.102.196', port: '5002'})


export const formatAddressAccount = id => {
  if(!id) return null;
  return id.substr(0, 6) + '...' + id.substr(id.length - 4);
}

export const formatDecimal = num => {
  if(!num) return 0.00;
  return (Math.round(num * 100) / 100).toFixed(2);
}

export const isAudioType = (s) => /\.(mp3)$/i.test(s);

export const isVideoType = s => /\.(mp4)$/i.test(s);


export const uploadMetaDataToIpfs = async (formData) => {
  const ipfsStore = await ipfs.create({repo: 'Creator' + Math.random()})
  //Upload file
  const result = await ipfsStore.add(formData.bufferMedia);

  // Upload metadata json
  const metadata = {
      name: formData.name,
      description: formData.description,
      file: `https://ipfs.io/ipfs/${result.path}`,
      attributes: formData.attributes
  }

  const { cid: metadataCid } = await  ipfsStore.add({
      path: '/nft/metadata.json',
      content: JSON.stringify(metadata)
  })
  return metadataCid

}

export const generateImageByIpfs = async fileBuffer => {
  const ipfsStore = await ipfs.create({repo: 'Creator' + Math.random()})
  const result = await ipfsStore.add(fileBuffer);
  return `https://ipfs.io/ipfs/${result.path}`;
}
