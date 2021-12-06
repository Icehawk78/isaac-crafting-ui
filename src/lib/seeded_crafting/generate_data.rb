require 'nokogiri'
require 'json'

root_path = '/mnt/c/Program Files (x86)/Steam/steamapps/common/The Binding of Isaac Rebirth/resources-dlc3/'
# Run this command first!
# `/mnt/c/Program Files (x86)/Steam/steamapps/common/The Binding of Isaac Rebirth/tools/ResourceExtractor/Linux/resource_extractor`
# /mnt/c/Program\ Files\ \(x86\)/Steam/steamapps/common/The\ Binding\ of\ Isaac\ Rebirth/tools/ResourceExtractor/Linux/resource_extractor

itempools = Nokogiri::XML(File.read(root_path + 'itempools.xml'))
itemmeta = Nokogiri::XML(File.read(root_path + 'items_metadata.xml'))
items = Nokogiri::XML(File.read(root_path + 'items.xml'))

@strings = Nokogiri::XML(File.read(root_path + '../resources/stringtable.sta'))

def string_parse name
  @strings.search("key[name='#{name[1..-1]}']").first.elements.first.text
end

parsed_pools = itempools.root.elements.map{|pool|
  {
    name: pool['Name'],
    items: pool.elements.map{|item|
      {
        id: item['Id'].to_i,
        weight: item['Weight'].to_i
      }
    }
  }
}

parsed_meta = itemmeta.search('item').map{|i| [i['id'].to_i, i['quality'].to_i]}

parsed_items = items.root.elements.map{|item|
  [item['id'].to_i, {
    name: string_parse(item['name']),
    id: item['id'].to_i,
    description: string_parse(item['description']),
    type: item.name
    }] if ['passive', 'active', 'familiar'].include? item.name
}.compact

File.write('item_pool_data.json', JSON.pretty_generate(parsed_pools))
File.write('item_metadata_data.json', JSON.pretty_generate(parsed_meta))
File.write('items_data.json', JSON.pretty_generate(parsed_items))

alt_meta = parsed_meta.each_with_index.reduce({}){|res, (item, index)| res[item.first] = {quality: item.last}; res;}
alt_pool = parsed_pools.each_with_index.reduce({}){|res, (pool, index)| res[index] = pool[:items]; res;}

File.write('alt_meta.json', JSON.pretty_generate(alt_meta).gsub(/"(\d+?)"/, '\1'))
File.write('alt_pool.json', JSON.pretty_generate(alt_pool).gsub(/"(\d+?)"/, '\1'))