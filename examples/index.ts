import { TuyaContext } from "@tuya/tuya-connector-nodejs";
// const { TuyaContext } = require('../lib/index');
// import { TuyaContext } from '@tuya/tuya-connector-nodejs';

/**
 * api env entrypoint
 *
 * 'https://openapi.tuyacn.com',  // 亚洲 AY
 * 'https://openapi.tuyaus.com',  // 美区 US
 * 'https://openapi.tuyaeu.com',  // 欧洲 EU
 * 'https://openapi.tuyain.com',  // 印度 IN
 */

const context = new TuyaContext({
  baseUrl: "https://openapi.tuyaeu.com",
  accessKey: "u7uvu4gggt9r8pp5wr4n",
  secretKey: "7c05947f13124c718e51211562310225",
});

const main = async () => {
  // Define the device ID
  const device_id = "bfda16fb291bc033ac4nqm";
  // Query device details
  const devicedetail = await context.device.detail({
    device_id: device_id,
  });
  if (!devicedetail.success) {
    new Error();
  }
  console.log("Device details:", devicedetail);
  // Send commands
  const commands = await context.request({
    path: `/v1.0/iot-03/devices/${device_id}/commands`,
    method: "POST",
    body: {
      commands: [{ code: "switch_led", value: false }],
    },
  });
  if (!commands.success) {
    new Error();
  }
  console.log("Execution result:", commands);
};
main().catch((err) => {
  console.log(err);
});
