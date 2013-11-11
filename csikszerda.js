Voices = new Meteor.Collection('voices');

if (Meteor.isClient) {
  Template.voicesList.helpers({
    ccc_voices: Voices.find({alt: 'ccc'}, ["serial", "asc"]),
    hh_voices: Voices.find({alt: 'hh'}, ["serial", "asc"]),
    aa_voices: Voices.find({alt: 'aa'}, ["serial", "asc"]),
    gg_voices: Voices.find({alt: 'gg'}, ["serial", "asc"]),
    ff_voices: Voices.find({alt: 'ff'}, ["serial", "asc"]),
    ee_voices: Voices.find({alt: 'ee'}, ["serial", "asc"]),
    dd_voices: Voices.find({alt: 'dd'}, ["serial", "asc"]),
    cc_voices: Voices.find({alt: 'cc'}, ["serial", "asc"]),
    h_voices: Voices.find({alt: 'h'}, ["serial", "asc"]),
    a_voices: Voices.find({alt: 'a'}, ["serial", "asc"]),
    g_voices: Voices.find({alt: 'g'}, ["serial", "asc"]),
    f_voices: Voices.find({alt: 'f'}, ["serial", "asc"]),
    e_voices: Voices.find({alt: 'e'}, ["serial", "asc"]),
    d_voices: Voices.find({alt: 'd'}, ["serial", "asc"]),
    c_voices: Voices.find({alt: 'c'}, ["serial", "asc"])
  });

  Template.voiceItem.events({
    'click h3': function(e) {
      e.preventDefault();

      if (this.active == true){
        Voices.update({ _id: this._id } , { $set : { active: false }});
      }
      else
      {
        Voices.update({ _id: this._id } , { $set : { active: true }});
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {

    if (Voices.find().count() === 0) {
      for(var i=0;i<16;i++){
        for(var e=0;e<15;e++){
          Voices.insert({
            alt: ['c','d','e','f','g','a','h','cc','dd','ee','ff','gg','aa','hh','ccc'][e],
            serial: i,
            active: false
          });
        }
      }
    }

  });
}
