export const schema = {
    "models": {},
    "enums": {
        "NotificationPreference": {
            "name": "NotificationPreference",
            "values": [
                "ALL_MESSAGES",
                "MENTIONS",
                "NONE"
            ]
        }
    },
    "nonModels": {
        "UpsertStreamUserResponse": {
            "name": "UpsertStreamUserResponse",
            "fields": {
                "success": {
                    "name": "success",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                },
                "message": {
                    "name": "message",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            }
        }
    },
    "codegenVersion": "3.4.4",
    "version": "93de2a49c21288ac6b8b0133ee853a63"
};