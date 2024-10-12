import React, { useRef, useState, useEffect } from "react";
import videojs from "video.js";
import 'video.js/dist/video-js.css';
import "videojs-contrib-quality-levels";
import "videojs-hls-quality-selector";  


const VideoPlayer = ({fet}) => {
  const [m3u8BlobUrl, setM3u8BlobUrl] = useState(null);
  const videoRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [eff,seteff]=useState(null)
  // seteff(fet);
  // const [link,setlink] =useState(null)
  // let fet = [
  //   { url: 'https://www111.anzeat.pro/streamhls/8bc7e56bf518ad8e1a42e82c0ce51e1d/ep.14.1709317657.360.m3u8', quality: '360p' },
  //   { url: 'https://www111.anzeat.pro/streamhls/8bc7e56bf518ad8e1a42e82c0ce51e1d/ep.14.1709317657.480.m3u8', quality: '480p' },
  //   { url: 'https://www111.anzeat.pro/streamhls/8bc7e56bf518ad8e1a42e82c0ce51e1d/ep.14.1709317657.720.m3u8', quality: '720p' },
  //   { url: 'https://www111.anzeat.pro/streamhls/8bc7e56bf518ad8e1a42e82c0ce51e1d/ep.14.1709317657.1080.m3u8', quality: '1080p' },
  //   { url: 'https://www111.anzeat.pro/streamhls/8bc7e56bf518ad8e1a42e82c0ce51e1d/ep.14.1709317657.m3u8', quality: 'default' },
  //   { url: 'https://www111.anicdnstream.info/videos/hls/wC0YP8…56bf518ad8e1a42e82c0ce51e1d/ep.14.1709317657.m3u8', quality: 'backup' }
  // ];
  

  const createM3U8Playlist = (qualityLinks) => {
    let playlist = '#EXTM3U\n';
    playlist += '#EXT-X-VERSION:3\n';

    qualityLinks.forEach((link) => {
      let { quality, url } = link;
      let bandwidth;
      switch (quality) {
        case '360p': bandwidth = 800000; break;
        case '480p': bandwidth = 1400000; break;
        case '720p': bandwidth = 2400000; break;
        case '1080p': bandwidth = 3200000; break;
        case 'default': bandwidth = 1000000; break;
        default: bandwidth = 500000;
      }
      playlist += `#EXT-X-STREAM-INF:BANDWIDTH=${bandwidth},RESOLUTION=${quality}\n`;
      playlist += `${url}\n`;
    });

    return playlist;
  };
  // let link="https://stream-akamai.castr.com/5b9352dbda7b8c769937e459/live_2361c920455111ea85db6911fe397b9e/index.fmp4.m3u8"

//   useEffect(() => {
//    let liveURL = createM3U8Playlist(fet);
// console.log(liveURL)
//     // Convert the playlist string to a Blob
//     let blob = new Blob([liveURL], { type: 'application/x-mpegURL' });
//     const url = URL.createObjectURL(blob);
//     setM3u8BlobUrl(url);
//     // setPlayer(null)

//     return () => {
//       if (m3u8BlobUrl) {
//         URL.revokeObjectURL(m3u8BlobUrl);
//       }
//     };
//   }, [fet]);

  useEffect(() => {
    console.log(m3u8BlobUrl)
    if (videoRef.current &&  !player) {
      let p = videojs(videoRef.current, {
        autoplay: false,
        preload: "auto",
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
          src: fet.stream.multi.main.url,
          type: "application/x-mpegURL",
        }],
        controlBar: {
          skipButtons: {
            forward: 10,
            backward: 10
          }
        },
        playbackRates: [0.50, 0.75, 1,1.25, 1.5, 1.75, 2]
      });
     
      p.hlsQualitySelector({ displayCurrentQuality: true });
      setPlayer(p);

      return () => {
        if (player) {player.dispose();
        player=null
        }
      };
    }
    else if(player){
      player.src({ src: fet.stream.multi.main.url, type: "application/x-mpegURL" });
    }
  }, [fet]);

  return (
    <div data-vjs-player>
      <video
        ref={videoRef}
        className="video-js vjs-default-skin vjs-big-play-centered"
      />
     
    </div>
  );
};

export default VideoPlayer;
