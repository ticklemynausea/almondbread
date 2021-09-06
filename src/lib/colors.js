import interpolate from "color-interpolate";

const hex2rgb = (palette) => palette
  .map((p) => [p.substr(0, 2), p.substr(2, 2), p.substr(4, 2)].map((p) => parseInt(p, 16)));

const palettes = [
    ["09012F", "040449", "000764", "0C2C8A", "1852B1", "397DD1", "86B5E5", "D3ECF8", "F1E9BF", "F8C95F", "FFAA00", "CC8000", "995700", "19071A", "6A3403", "000000"],
    ["E3F2FD", "BBDEFB", "90CAF9", "64B5F6", "42A5F5", "2196F3", "1E88E5", "1976D2", "1565C0", "0D47A1"],
    ["0466C8", "0353A4", "023E7D", "002855", "001845", "001233", "33415C", "5C677D", "7D8597", "979DAC"],
    ["FEC5BB", "FCD5CE", "FAE1DD", "F8EDEB", "E8E8E4", "D8E2DC", "ECE4DB", "FFE5D9", "FFD7BA", "FEC89A"],
    ["F72585", "B5179E", "7209B7", "560BAD", "480CA8", "3A0CA3", "3F37C9", "4361EE", "4895EF", "4CC9F0"],
    ["03071E", "370617", "6A040F", "9D0208", "D00000", "DC2F02", "E85D04", "F48C06", "FAA307", "FFBA08"],
    ["F94144", "F3722C", "F8961E", "F9844A", "F9C74F", "90BE6D", "43AA8B", "4D908E", "577590", "277DA1"],
    ["7400B8", "6930C3", "5E60CE", "5390D9", "4EA8DE", "48BFE3", "56CFE1", "64DFDF", "72EFDD", "80FFDB"],
    ["582F0E", "7F4F24", "936639", "A68A64", "B6AD90", "C2C5AA", "A4AC86", "656D4A", "414833", "333D29"],
    ["FFCBF2", "F3C4FB", "ECBCFD", "E5B3FE", "E2AFFF", "DEAAFF", "D8BBFF", "D0D1FF", "C8E7FF", "C0FDFF"],
    ["0B090A", "161A1D", "660708", "A4161A", "BA181B", "E5383B", "B1A7A6", "D3D3D3", "F5F3F4", "FFFFFF"],
    ["D9ED92", "B5E48C", "99D98C", "76C893", "52B69A", "34A0A4", "168AAD", "1A759F", "1E6091", "184E77"],
    ["007F5F", "2B9348", "55A630", "80B918", "AACC00", "BFD200", "D4D700", "DDDF00", "EEEF20", "FFFF3F"],
    ["006466", "065A60", "0B525B", "144552", "1B3A4B", "212F45", "272640", "312244", "3E1F47", "4D194D"],
    ["001219", "005F73", "0A9396", "94D2BD", "E9D8A6", "EE9B00", "CA6702", "BB3E03", "AE2012", "9B2226"],
    ["012A4A", "013A63", "01497C", "014F86", "2A6F97", "2C7DA0", "468FAF", "61A5C2", "89C2D9", "A9D6E5"],
    ["FFEDD8", "F3D5B5", "E7BC91", "D4A276", "BC8A5F", "A47148", "8B5E34", "6F4518", "603808", "583101"],
    ["590D22", "800F2F", "A4133C", "C9184A", "FF4D6D", "FF758F", "FF8FA3", "FFB3C1", "FFCCD5", "FFF0F3"],
    ["FF7B00", "FF8800", "FF9500", "FFA200", "FFAA00", "FFB700", "FFC300", "FFD000", "FFDD00", "FFEA00"],
    ["99E2B4", "88D4AB", "78C6A3", "67B99A", "56AB91", "469D89", "358F80", "248277", "14746F", "036666"],
    ["EDC4B3", "E6B8A2", "DEAB90", "D69F7E", "CD9777", "C38E70", "B07D62", "9D6B53", "8A5A44", "774936"],
    ["033270", "1368AA", "4091C9", "9DCEE2", "FEDFD4", "F29479", "F26A4F", "EF3C2D", "CB1B16", "65010C"],
    ["FF6D00", "FF7900", "FF8500", "FF9100", "FF9E00", "240046", "3C096C", "5A189A", "7B2CBF", "9D4EDD"],
    ["757BC8", "8187DC", "8E94F2", "9FA0FF", "ADA7FF", "BBADFF", "CBB2FE", "DAB6FC", "DDBDFC", "E0C3FC"],
    ["797D62", "9B9B7A", "BAA587", "D9AE94", "F1DCA7", "FFCB69", "E8AC65", "D08C60", "B58463", "997B66"],
    ["E8A598", "FFB5A7", "FEC5BB", "FCD5CE", "FAE1DD", "F8EDEB", "F9E5D8", "F9DCC4", "FCD2AF", "FEC89A"],
    ["FF0000", "FF8700", "FFD300", "DEFF0A", "A1FF0A", "0AFF99", "0AEFFF", "147DF5", "580AFF", "BE0AFF"],
    ["FFE169", "FAD643", "EDC531", "DBB42C", "C9A227", "B69121", "A47E1B", "926C15", "805B10", "76520E"],
    ["641220", "6E1423", "85182A", "A11D33", "A71E34", "B21E35", "BD1F36", "C71F37", "DA1E37", "E01E37"],
    ["FF4800", "FF5400", "FF6000", "FF6D00", "FF7900", "FF8500", "FF9100", "FF9E00", "FFAA00", "FFB600"],
    ["EA698B", "D55D92", "C05299", "AC46A1", "973AA8", "822FAF", "6D23B6", "6411AD", "571089", "47126B"],
    ["FFDCC2", "FFD1AD", "FFC599", "EDA268", "DA7E37", "C06722", "A85311", "8F3E00", "713200", "522500"],
    ["EDDCD2", "FFF1E6", "FDE2E4", "FAD2E1", "C5DEDD", "DBE7E4", "F0EFEB", "D6E2E9", "BCD4E6", "99C1DE"],
    ["E2E2DF", "D2D2CF", "E2CFC4", "F7D9C4", "FAEDCB", "C9E4DE", "C6DEF1", "DBCDF0", "F2C6DE", "F9C6C9"],
    ["DEC9E9", "DAC3E8", "D2B7E5", "C19EE0", "B185DB", "A06CD5", "9163CB", "815AC0", "7251B5", "6247AA"],
    ["E03615", "E24C16", "E46217", "E67818", "E88D18", "ECB81A", "EECE1B", "EFD91B", "F0DE1B", "F0E31B"],
].map(hex2rgb);

const mapColors = (iterations, paletteIndex, coloringMethod) => {
  const palette = palettes[paletteIndex];
  const interpolated = coloringMethod === "lerp" || coloringMethod === "smoothstep" ?
    interpolate(palette, coloringMethod) :
    null;

  const mappedColors = [];
  for (let iteration = 0; iteration <= iterations; iteration++) {
    if (coloringMethod === "lerp" || coloringMethod === "smoothstep") {
      const rgb = interpolated(iteration/iterations);
      const color = rgb.replace(/[^\d,]/g, '').split(',').map((n) => parseInt(n));

      mappedColors.push(color);
    } else  {
      const color = palette[iteration % palette.length];

      mappedColors.push(color);
    }
  }

  return mappedColors;
};

export { mapColors, palettes };
