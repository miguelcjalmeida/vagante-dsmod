import { IItemEntity } from "../../rooms/entities"

export default <IItemEntity[]><any>[
    {
        "type": "Bonfire",
        "x": 125,
        "y": 272
    },{
        "type": "Grave",
        "x": 160,
        "y": 288
    },{
        "type": "Grave",
        "x": 112,
        "y": 288
    },{
        "type": "Grave",
        "x": 176,
        "y": 288
    },{
        "type": "Grave",
        "x": 96,
        "y": 288
    },{
        "type": "LoadSavePoint",
        "x": 192,
        "y": 288
    },{
        "type": "Doodad",
        "x": 496,
        "y": 240,
        "doodadType": 0
    },{
        "type": "Doodad",
        "x": 496,
        "y": 256,
        "doodadType": 0
    },{
        "type": "Doodad",
        "x": 496,
        "y": 272,
        "doodadType": 0
    },{
        "type": "Doodad",
        "x": 496,
        "y": 288,
        "doodadType": 0
    },{
        "type": "Doodad",
        "x": 480,
        "y": 288,
        "doodadType": 0
    },{
        "type": "Doodad",
        "x": 480,
        "y": 272,
        "doodadType": 0
    },{
        "type": "Doodad",
        "x": 480,
        "y": 256,
        "doodadType": 0
    },{
        "type": "Doodad",
        "x": 480,
        "y": 240,
        "doodadType": 0
    },{
        "type": "Doodad",
        "x": 464,
        "y": 240,
        "doodadType": 0
    },{
        "type": "Doodad",
        "x": 464,
        "y": 256,
        "doodadType": 0
    },{
        "type": "Doodad",
        "x": 464,
        "y": 272,
        "doodadType": 0
    },{
        "type": "Doodad",
        "x": 464,
        "y": 288,
        "doodadType": 0
    },{
        "type": "PlayerMod",
        "x": 243,
        "y": 272,
        "modType": 5,
        "amount": 0,
        "vec.x": 100,
        "vec.y": 20,
        "w": 16,
        "h": 16
    },{
        "type": "PlayerMod",
        "x": 32,
        "y": 16,
        "modType": 5,
        "amount": 0,
        "vec.x": 80,
        "vec.y": 280,
        "w": 48,
        "h": 16
    },{
        "type": "PlayerMod",
        "x": 375,
        "y": 16,
        "modType": 5,
        "amount": 0,
        "vec.x": 100,
        "vec.y": 130,
        "w": 60,
        "h": 16
    },{
        "type": "PlayerMod",
        "x": 32,
        "y": 128,
        "modType": 5,
        "amount": 0,
        "vec.x": 360,
        "vec.y": 20,
        "w": 48,
        "h": 16
    },{
        "type": "PlayerMod",
        "x": 376,
        "y": 128,
        "modType": 5,
        "amount": 0,
        "vec.x": 400,
        "vec.y": 280,
        "w": 48,
        "h": 16
    },{
        "uid": "HoverText_0",
        "type": "HoverText",
        "x": 78,
        "y": 69,
        "w": 16,
        "h": 16,
        "text": "DogMaster"
    },{
        "uid": "Trigger_0",
        "links": [
            "HoverText_0"
        ],
        "type": "Trigger",
        "x": 96,
        "y": 16,
        "w": 16,
        "h": 32,
        "condition": {
            "type": "TOUCHING_PLAYER"
        }
    }
]