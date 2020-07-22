import StreamArray from 'stream-json/streamers/StreamArray';
import { createReadStream } from 'fs';
import { Writable } from 'stream';

const saveLargeJson = (
  path: string,
  saveFunc,
  transform,
  timeout = 1,
  onComplete?,
) => {

  try {
    const fileStream = createReadStream(path, {
      flags: 'r',
      encoding: 'utf-8',
    });
    const jsonStream = StreamArray.withParser();

    const processingStream = new Writable({
      write({ key, value }, encoding, callback) {
        const formattedData = transform(key, value);
        /**
         * Call function on each row
         */
        saveFunc(formattedData);

        setTimeout(() => {
          callback();
        }, timeout);
      },
      /**
       * We need to operate with objects, not buffers
       */
      objectMode: true,
    });

    fileStream.pipe(jsonStream.input);
    jsonStream.pipe(processingStream);

    processingStream.on('error', error =>
      console.log(`There was an error ${error}`),
    );
    processingStream.on('finish', () => {
      console.log('Completed importing', path)
      onComplete && onComplete()
    });
  } catch (e) {
    console.log(e);
  }
};

export default saveLargeJson;
