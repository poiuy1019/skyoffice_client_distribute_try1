import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'

interface WhiteboardState {
  whiteboardDialogOpen: boolean
  whiteboardId: null | string
  whiteboardUrl: null | string
  urls: Map<string, string>
}

const initialState: WhiteboardState = {
  whiteboardDialogOpen: false,
  whiteboardId: null,
  whiteboardUrl: null,
  urls: new Map(),
}

export const whiteboardSlice = createSlice({
  name: 'whiteboard',
  initialState,
  reducers: {
    openWhiteboardDialog: (state, action: PayloadAction<string>) => {
      state.whiteboardDialogOpen = true
      state.whiteboardId = action.payload
      const url = state.urls.get(action.payload)
      if (url) state.whiteboardUrl = url
      const game = phaserGame.scene.keys.game as Game
      game.disableKeys()
    },
    closeWhiteboardDialog: (state) => {
      const game = phaserGame.scene.keys.game as Game
      game.enableKeys()
      game.network.disconnectFromWhiteboard(state.whiteboardId!)
      state.whiteboardDialogOpen = false
      state.whiteboardId = null
      state.whiteboardUrl = null
    },
    //화이트보드 url 코드
    // setWhiteboardUrls: (state, action: PayloadAction<{ whiteboardId: string; roomId: string }>) => {
    //   state.urls.set(
    //     action.payload.whiteboardId,
    //     `https://wbo.ophir.dev/boards/sky-office-${action.payload.roomId}`
    //   )
    // },
    //수정 부분
    setWhiteboardUrls: (state, action: PayloadAction<{ whiteboardId: string; url: string }>) => {
      // Set the URL for the specific whiteboardId in the map
      state.urls.set(action.payload.whiteboardId, action.payload.url);
    },
    //수정 부분
  },
})

export const { openWhiteboardDialog, closeWhiteboardDialog, setWhiteboardUrls } =
  whiteboardSlice.actions

export default whiteboardSlice.reducer
