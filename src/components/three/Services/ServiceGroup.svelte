<script lang="ts">
  import { T, useFrame, useThrelte } from "@threlte/core";
  import { tweened } from 'svelte/motion';
  import Sprites from "./Sprites.svelte";

  const MIN_Y = -30;
  const MAX_Y = -50;

  export let getAssetSrc: () => string;
  let positionY = tweened(MIN_Y, {duration: 400});
  let movePos = true;
  
  const { camera } = useThrelte();

  useFrame(() => {
    const inView = camera.current.position.y > MAX_Y && camera.current.position.y < MIN_Y;
    if (inView && movePos) {
      positionY.set(camera.current.position.y);
    } else {
      positionY.set(Math.abs(MAX_Y-camera.current.position.y) < Math.abs(MIN_Y-camera.current.position.y) ? MAX_Y : MIN_Y);
    }
  })

</script>

<T.Group position={[0, $positionY, 0]}>
  <Sprites
    {getAssetSrc}
  />
</T.Group>
