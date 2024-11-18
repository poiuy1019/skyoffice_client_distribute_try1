import { ItemType } from '../../../types/Items'
import Item from './Item'
// Exporting the Chair class which extends from the Item class
export default class Chair extends Item {
   // Optional property that may store the direction/orientation of the chair
  itemDirection?: string
 // Constructor method called when a new Chair instance is created
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    // Calling the constructor of the parent Item class with the provided parameters
    super(scene, x, y, texture, frame)
    // Setting the item type to CHAIR, allowing it to be identified as such within the game logic
    this.itemType = ItemType.CHAIR
  }
  // Method that displays a dialog box when an overlap event occurs (e.g., the player is near the chair)
  onOverlapDialog() {
     // Using a method (assumed to be defined in the Item class) to display a prompt to the player
    this.setDialogBox('Press E to sit')
  }
}
