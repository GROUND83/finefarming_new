-- AlterTable
ALTER TABLE "Farm" ALTER COLUMN "fridayEnd" SET DEFAULT '19:00',
ALTER COLUMN "holidayEnd" SET DEFAULT '19:00',
ALTER COLUMN "mondayEnd" SET DEFAULT '19:00',
ALTER COLUMN "saturdayEnd" SET DEFAULT '19:00',
ALTER COLUMN "sundayEnd" SET DEFAULT '19:00',
ALTER COLUMN "thursdayEnd" SET DEFAULT '19:00',
ALTER COLUMN "tuesdayEnd" SET DEFAULT '19:00',
ALTER COLUMN "wednesdayEnd" SET DEFAULT '19:00',
ALTER COLUMN "slot" SET DEFAULT ARRAY['{ "type": false ,"visible": true ,"startTime": "9:00" ,"amount": 3}']::JSONB[];
