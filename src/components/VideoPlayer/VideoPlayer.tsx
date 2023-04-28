import { useLocalStorage } from "helpers/useLocalStorage";
import { useEffect, useRef, useState } from "react";
import ReactHlsPlayer from "react-hls-player";

type Props = {
  link: string;
};

const VideoPlayer: React.FC<Props> = ({ link }) => {
  const playerRef = useRef<HTMLVideoElement>(null);
  const [videoProgress, setVideoProgress] = useLocalStorage<number>(link, 0);
  const [speed, setSpeed] = useState<number>(1);

  useEffect(() => {
    const player = playerRef.current; 

    if (videoProgress !== 0 && player) {
      player.currentTime = videoProgress;
    }

    const handleUnload = () => {
      if (player) {
        const newTime = player.currentTime;

        if (newTime !== 0 && newTime !== videoProgress) {
          setVideoProgress(newTime);
        }
      }
    };

    return handleUnload;
  }, [playerRef, setVideoProgress, videoProgress, link]);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.playbackRate = speed;
    }
  }, [speed, playerRef]);

  useEffect(() => {
    const increaseSpeedButton = "+";
    const decreaseSpeedButton = "-";

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === increaseSpeedButton) {
        setSpeed((prevSpeed) =>
          prevSpeed !== 2 ? prevSpeed + 0.25 : prevSpeed
        );
      }

      if (event.key === decreaseSpeedButton) {
        setSpeed((prevSpeed) =>
          prevSpeed !== 0.25 ? prevSpeed - 0.25 : prevSpeed
        );
      }
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.addEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <>
      <ReactHlsPlayer
        src={link}
        autoPlay={false}
        controls={true}
        width="60%"
        height="auto"
        playerRef={playerRef}
      />

      <p>You can change video speed by + and - keys on your NumPad</p>
      <i>Current speed: {speed.toFixed(2)}</i>
    </>
  );
};

export default VideoPlayer;
