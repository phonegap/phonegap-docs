#!/usr/bin/perl

# Compares PhoneGap-specific merge files with corresponding Cordova
# files they overwrite. Run on Unix. Sensitive to directory structure,
# so run locally in the merged content's top-level edge directory.
# Reports on: new files, mismatching titles, and provides diffs.

# use Data::Dumper;
use Slurp;

my @files;
my ($new_path, $new_file, $new_title, $old_path, $old_file, $old_title, $diff);
my $alt_path = q~../../../docs/en/edge~;

chomp(@files = `find . -print | grep md\$`);

 FILE: 
    for $new_path (@files) {
        $new_title = $old_title = undef;
        next FILE if $new_path =~ m~/[_,]~;        # ignore comma/underscore prefixed files
        $new_path =~ s~^\./~~;
        $new_file = slurp($new_path);
        $new_file =~ m~^(# .+)~mg and $new_title = $1; # assume A-head is present
        $old_path  = $alt_path . q~/~ . $new_path;
        if (! -s $old_path) {
            print STDOUT qq~NEW:\t$new_path\t$new_title\n\n~;
            next FILE;
        }
        $old_file = slurp($old_path);
        if (! $old_file) {
            die;
        }
        $old_file =~ m~^(# .+)~mg and $old_title = $1; # assume A-head is present
        if ($new_title ne $old_title) {
            print STDOUT qq~MISMATCH, old & new:\n\t$old_path\t$old_title\n\t$new_path\t$new_title\n\n~;
        }
        $diff = `diff $old_path $new_path`;
        $diff =~ s~^~\t~mg;
        print STDOUT $diff . qq~\n\n~;
    }
